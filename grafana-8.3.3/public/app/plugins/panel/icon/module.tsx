import { PanelPlugin } from '@grafana/data';

import { IconPanel } from './IconPanel';
import { defaultPanelOptions, PanelOptions } from './models.gen';
import { IconConfig, iconItem } from 'app/features/canvas/elements/icon';
import { optionBuilder } from '../canvas/editor/options';
import { CanvasElementOptions } from 'app/features/canvas';

export const plugin = new PanelPlugin<PanelOptions>(IconPanel)
  .setNoPadding() // extend to panel edges
  .useFieldConfig()
  .setPanelOptions((builder) => {
    builder.addNestedOptions<CanvasElementOptions<IconConfig>>({
      category: ['Icon'],
      path: 'root',

      // Dynamically fill the selected element
      build: (builder, ctx) => {
        iconItem.registerOptionsUI!(builder, ctx);

        optionBuilder.addBackground(builder, ctx);
        optionBuilder.addBorder(builder, ctx);
      },

      defaultValue: defaultPanelOptions.root as any,
    });
  });
