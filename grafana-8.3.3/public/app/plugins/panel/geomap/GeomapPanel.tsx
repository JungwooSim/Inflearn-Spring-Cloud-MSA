import React, { Component, ReactNode } from 'react';
import { DEFAULT_BASEMAP_CONFIG, geomapLayerRegistry } from './layers/registry';
import { Map as OpenLayersMap, MapBrowserEvent, View } from 'ol';
import Attribution from 'ol/control/Attribution';
import Zoom from 'ol/control/Zoom';
import ScaleLine from 'ol/control/ScaleLine';
import { defaults as interactionDefaults } from 'ol/interaction';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';

import {
  PanelData,
  MapLayerOptions,
  PanelProps,
  GrafanaTheme,
  DataHoverClearEvent,
  DataHoverEvent,
  DataFrame,
} from '@grafana/data';
import { config } from '@grafana/runtime';

import { ControlsOptions, GeomapPanelOptions, MapLayerState, MapViewConfig } from './types';
import { centerPointRegistry, MapCenterID } from './view';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import { css } from '@emotion/css';
import { PanelContext, PanelContextRoot, Portal, stylesFactory, VizTooltipContainer } from '@grafana/ui';
import { GeomapOverlay, OverlayProps } from './GeomapOverlay';
import { DebugOverlay } from './components/DebugOverlay';
import { getGlobalStyles } from './globalStyles';
import { Global } from '@emotion/react';
import { GeomapHoverFeature, GeomapHoverPayload } from './event';
import { DataHoverView } from './components/DataHoverView';
import { Subscription } from 'rxjs';
import { PanelEditExitedEvent } from 'app/types/events';
import { defaultMarkersConfig, MARKERS_LAYER_ID } from './layers/data/markersLayer';
import { cloneDeep } from 'lodash';

// Allows multiple panels to share the same view instance
let sharedView: View | undefined = undefined;

type Props = PanelProps<GeomapPanelOptions>;
interface State extends OverlayProps {
  ttip?: GeomapHoverPayload;
}

export interface GeomapLayerActions {
  selectLayer: (uid: string) => void;
  deleteLayer: (uid: string) => void;
  addlayer: (type: string) => void;
  reorder: (src: number, dst: number) => void;
  canRename: (v: string) => boolean;
}

export interface GeomapInstanceState {
  map?: OpenLayersMap;
  layers: MapLayerState[];
  selected: number;
  actions: GeomapLayerActions;
}

export class GeomapPanel extends Component<Props, State> {
  static contextType = PanelContextRoot;
  panelContext: PanelContext = {} as PanelContext;
  private subs = new Subscription();

  globalCSS = getGlobalStyles(config.theme2);

  mouseWheelZoom?: MouseWheelZoom;
  style = getStyles(config.theme);
  hoverPayload: GeomapHoverPayload = { point: {}, pageX: -1, pageY: -1 };
  readonly hoverEvent = new DataHoverEvent(this.hoverPayload);

  map?: OpenLayersMap;
  mapDiv?: HTMLDivElement;
  layers: MapLayerState[] = [];
  readonly byName = new Map<string, MapLayerState>();

  constructor(props: Props) {
    super(props);
    this.state = {};
    this.subs.add(
      this.props.eventBus.subscribe(PanelEditExitedEvent, (evt) => {
        if (this.mapDiv && this.props.id === evt.payload) {
          this.initMapRef(this.mapDiv);
        }
      })
    );
  }

  componentDidMount() {
    this.panelContext = this.context as PanelContext;
  }

  shouldComponentUpdate(nextProps: Props) {
    if (!this.map) {
      return true; // not yet initialized
    }

    // Check for resize
    if (this.props.height !== nextProps.height || this.props.width !== nextProps.width) {
      this.map.updateSize();
    }

    // External data changed
    if (this.props.data !== nextProps.data) {
      this.dataChanged(nextProps.data);
    }

    return true; // always?
  }

  /** This funciton will actually update the JSON model */
  private doOptionsUpdate(selected: number) {
    const { options, onOptionsChange } = this.props;
    const layers = this.layers;
    onOptionsChange({
      ...options,
      basemap: layers[0].options,
      layers: layers.slice(1).map((v) => v.options),
    });

    // Notify the the panel editor
    if (this.panelContext.onInstanceStateChange) {
      this.panelContext.onInstanceStateChange({
        map: this.map,
        layers: layers,
        selected,
        actions: this.actions,
      });
    }
  }

  getNextLayerName = () => {
    let idx = this.layers.length; // since basemap is 0, this looks right
    while (true && idx < 100) {
      const name = `Layer ${idx++}`;
      if (!this.byName.has(name)) {
        return name;
      }
    }
    return `Layer ${Date.now()}`;
  };

  actions: GeomapLayerActions = {
    selectLayer: (uid: string) => {
      const selected = this.layers.findIndex((v) => v.options.name === uid);
      if (this.panelContext.onInstanceStateChange) {
        this.panelContext.onInstanceStateChange({
          map: this.map,
          layers: this.layers,
          selected,
          actions: this.actions,
        });
      }
    },
    canRename: (v: string) => {
      return !this.byName.has(v);
    },
    deleteLayer: (uid: string) => {
      const layers: MapLayerState[] = [];
      for (const lyr of this.layers) {
        if (lyr.options.name === uid) {
          this.map?.removeLayer(lyr.layer);
        } else {
          layers.push(lyr);
        }
      }
      this.layers = layers;
      this.doOptionsUpdate(0);
    },
    addlayer: (type: string) => {
      const item = geomapLayerRegistry.getIfExists(type);
      if (!item) {
        return; // ignore empty request
      }
      this.initLayer(
        this.map!,
        {
          type: item.id,
          name: this.getNextLayerName(),
          config: cloneDeep(item.defaultOptions),
        },
        false
      ).then((lyr) => {
        this.layers = this.layers.slice(0);
        this.layers.push(lyr);
        this.map?.addLayer(lyr.layer);

        this.doOptionsUpdate(this.layers.length - 1);
      });
    },
    reorder: (startIndex: number, endIndex: number) => {
      const result = Array.from(this.layers);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      this.layers = result;

      this.doOptionsUpdate(endIndex);

      // Add the layers in the right order
      const group = this.map?.getLayers()!;
      group.clear();
      this.layers.forEach((v) => group.push(v.layer));
    },
  };

  /**
   * Called when the panel options change
   *
   * NOTE: changes to basemap and layers are handled independently
   */
  optionsChanged(options: GeomapPanelOptions) {
    const oldOptions = this.props.options;
    console.log('options changed!', options);

    if (options.view !== oldOptions.view) {
      console.log('View changed');
      this.map!.setView(this.initMapView(options.view));
    }

    if (options.controls !== oldOptions.controls) {
      console.log('Controls changed');
      this.initControls(options.controls ?? { showZoom: true, showAttribution: true });
    }
  }

  /**
   * Called when PanelData changes (query results etc)
   */
  dataChanged(data: PanelData) {
    for (const state of this.layers) {
      if (state.handler.update) {
        state.handler.update(data);
      }
    }
  }

  initMapRef = async (div: HTMLDivElement) => {
    this.mapDiv = div;
    if (this.map) {
      this.map.dispose();
    }

    if (!div) {
      this.map = (undefined as unknown) as OpenLayersMap;
      return;
    }
    const { options } = this.props;

    const map = (this.map = new OpenLayersMap({
      view: this.initMapView(options.view),
      pixelRatio: 1, // or zoom?
      layers: [], // loaded explicitly below
      controls: [],
      target: div,
      interactions: interactionDefaults({
        mouseWheelZoom: false, // managed by initControls
      }),
    }));

    this.byName.clear();
    const layers: MapLayerState[] = [];
    try {
      layers.push(await this.initLayer(map, options.basemap ?? DEFAULT_BASEMAP_CONFIG, true));

      // Default layer values
      let layerOptions = options.layers;
      if (!layerOptions) {
        layerOptions = [defaultMarkersConfig];
      }

      for (const lyr of layerOptions) {
        layers.push(await this.initLayer(map, lyr, false));
      }
    } catch (ex) {
      console.error('error loading layers', ex);
    }

    this.layers = layers;
    for (const lyr of layers) {
      this.map.addLayer(lyr.layer);
    }

    this.mouseWheelZoom = new MouseWheelZoom();
    this.map.addInteraction(this.mouseWheelZoom);
    this.initControls(options.controls);
    this.forceUpdate(); // first render

    // Tooltip listener
    this.map.on('pointermove', this.pointerMoveListener);
    this.map.getViewport().addEventListener('mouseout', (evt) => {
      this.props.eventBus.publish(new DataHoverClearEvent());
    });

    // Notify the the panel editor
    if (this.panelContext.onInstanceStateChange) {
      this.panelContext.onInstanceStateChange({
        map: this.map,
        layers: layers,
        selected: layers.length - 1, // the top layer
        actions: this.actions,
      });
    }
  };

  clearTooltip = () => {
    if (this.state.ttip) {
      this.setState({ ttip: undefined });
    }
  };

  pointerMoveListener = (evt: MapBrowserEvent<UIEvent>) => {
    if (!this.map) {
      return;
    }
    const mouse = evt.originalEvent as any;
    const pixel = this.map.getEventPixel(mouse);
    const hover = toLonLat(this.map.getCoordinateFromPixel(pixel));

    const { hoverPayload } = this;
    hoverPayload.pageX = mouse.pageX;
    hoverPayload.pageY = mouse.pageY;
    hoverPayload.point = {
      lat: hover[1],
      lon: hover[0],
    };
    hoverPayload.data = undefined;
    hoverPayload.columnIndex = undefined;
    hoverPayload.rowIndex = undefined;
    hoverPayload.feature = undefined;

    let ttip: GeomapHoverPayload = {} as GeomapHoverPayload;
    const features: GeomapHoverFeature[] = [];
    this.map.forEachFeatureAtPixel(pixel, (feature, layer, geo) => {
      if (!hoverPayload.data) {
        const props = feature.getProperties();
        const frame = props['frame'];
        if (frame) {
          hoverPayload.data = ttip.data = frame as DataFrame;
          hoverPayload.rowIndex = ttip.rowIndex = props['rowIndex'];
        } else {
          hoverPayload.feature = ttip.feature = feature;
        }
      }
      features.push({ feature, layer, geo });
    });
    this.hoverPayload.features = features.length ? features : undefined;
    this.props.eventBus.publish(this.hoverEvent);

    const currentTTip = this.state.ttip;
    if (
      ttip.data !== currentTTip?.data ||
      ttip.rowIndex !== currentTTip?.rowIndex ||
      ttip.feature !== currentTTip?.feature
    ) {
      this.setState({ ttip: { ...hoverPayload } });
    }
  };

  private updateLayer = async (uid: string, newOptions: MapLayerOptions): Promise<boolean> => {
    if (!this.map) {
      return false;
    }
    const current = this.byName.get(uid);
    if (!current) {
      return false;
    }

    let layerIndex = -1;
    const group = this.map?.getLayers()!;
    for (let i = 0; i < group?.getLength(); i++) {
      if (group.item(i) === current.layer) {
        layerIndex = i;
        break;
      }
    }

    // Special handling for rename
    if (newOptions.name !== uid) {
      if (!newOptions.name) {
        newOptions.name = uid;
      } else if (this.byName.has(newOptions.name)) {
        return false;
      }
      console.log('Layer name changed', uid, '>>>', newOptions.name);
      this.byName.delete(uid);

      uid = newOptions.name;
      this.byName.set(uid, current);
    }

    // Type changed -- requires full re-initalization
    if (current.options.type !== newOptions.type) {
      // full init
    } else {
      // just update options
    }

    const layers = this.layers.slice(0);
    try {
      const info = await this.initLayer(this.map, newOptions, current.isBasemap);
      layers[layerIndex] = info;
      group.setAt(layerIndex, info.layer);

      // initialize with new data
      if (info.handler.update) {
        info.handler.update(this.props.data);
      }
    } catch (err) {
      console.warn('ERROR', err);
      return false;
    }

    this.layers = layers;
    this.doOptionsUpdate(layerIndex);
    return true;
  };

  async initLayer(map: OpenLayersMap, options: MapLayerOptions, isBasemap?: boolean): Promise<MapLayerState> {
    if (isBasemap && (!options?.type || config.geomapDisableCustomBaseLayer)) {
      options = DEFAULT_BASEMAP_CONFIG;
    }

    // Use default makers layer
    if (!options?.type) {
      options = {
        type: MARKERS_LAYER_ID,
        name: this.getNextLayerName(),
        config: {},
      };
    }

    const item = geomapLayerRegistry.getIfExists(options.type);
    if (!item) {
      return Promise.reject('unknown layer: ' + options.type);
    }

    const handler = await item.create(map, options, config.theme2);
    const layer = handler.init();

    if (handler.update) {
      handler.update(this.props.data);
    }

    if (!options.name) {
      options.name = this.getNextLayerName();
    }
    const UID = options.name;
    const state = {
      UID, // unique name when added to the map (it may change and will need special handling)
      isBasemap,
      options,
      layer,
      handler,

      // Used by the editors
      onChange: (cfg: MapLayerOptions) => {
        this.updateLayer(UID, cfg);
      },
    };
    this.byName.set(UID, state);
    return state;
  }

  initMapView(config: MapViewConfig): View {
    let view = new View({
      center: [0, 0],
      zoom: 1,
      showFullExtent: true, // allows zooming so the full range is visible
    });

    // With shared views, all panels use the same view instance
    if (config.shared) {
      if (!sharedView) {
        sharedView = view;
      } else {
        view = sharedView;
      }
    }

    const v = centerPointRegistry.getIfExists(config.id);
    if (v) {
      let coord: Coordinate | undefined = undefined;
      if (v.lat == null) {
        if (v.id === MapCenterID.Coordinates) {
          coord = [config.lon ?? 0, config.lat ?? 0];
        } else {
          console.log('TODO, view requires special handling', v);
        }
      } else {
        coord = [v.lon ?? 0, v.lat ?? 0];
      }
      if (coord) {
        view.setCenter(fromLonLat(coord));
      }
    }

    if (config.maxZoom) {
      view.setMaxZoom(config.maxZoom);
    }
    if (config.minZoom) {
      view.setMaxZoom(config.minZoom);
    }
    if (config.zoom) {
      view.setZoom(config.zoom);
    }
    return view;
  }

  initControls(options: ControlsOptions) {
    if (!this.map) {
      return;
    }
    this.map.getControls().clear();

    if (options.showZoom) {
      this.map.addControl(new Zoom());
    }

    if (options.showScale) {
      this.map.addControl(
        new ScaleLine({
          units: options.scaleUnits,
          minWidth: 100,
        })
      );
    }

    this.mouseWheelZoom!.setActive(Boolean(options.mouseWheelZoom));

    if (options.showAttribution) {
      this.map.addControl(new Attribution({ collapsed: true, collapsible: true }));
    }

    // Update the react overlays
    let topRight: ReactNode[] = [];
    if (options.showDebug) {
      topRight = [<DebugOverlay key="debug" map={this.map} />];
    }

    this.setState({ topRight });
  }

  render() {
    const { ttip, topRight, bottomLeft } = this.state;

    return (
      <>
        <Global styles={this.globalCSS} />
        <div className={this.style.wrap} onMouseLeave={this.clearTooltip}>
          <div className={this.style.map} ref={this.initMapRef}></div>
          <GeomapOverlay bottomLeft={bottomLeft} topRight={topRight} />
        </div>
        <Portal>
          {ttip && (ttip.data || ttip.feature) && (
            <VizTooltipContainer position={{ x: ttip.pageX, y: ttip.pageY }} offset={{ x: 10, y: 10 }}>
              <DataHoverView {...ttip} />
            </VizTooltipContainer>
          )}
        </Portal>
      </>
    );
  }
}

const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  wrap: css`
    position: relative;
    width: 100%;
    height: 100%;
  `,
  map: css`
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
  `,
}));
