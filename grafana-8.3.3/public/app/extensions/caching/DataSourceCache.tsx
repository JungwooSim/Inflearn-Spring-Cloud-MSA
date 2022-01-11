import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { getNavModel } from 'app/core/selectors/navModel';
import { getDataSourceLoadingNav } from 'app/features/datasources/state/navModel';
import PageHeader from 'app/core/components/PageHeader/PageHeader';
import { loadDataSource } from 'app/features/datasources/state/actions';
import { GrafanaRouteComponentProps } from 'app/core/navigation/types';
import { EnterpriseStoreState } from '../types';
import {
  loadDataSourceCache,
  enableDataSourceCache,
  disableDataSourceCache,
  updateDataSourceCache,
} from './state/actions';
import { CacheSettingsDisable } from './CacheSettingsDisable';
import { CacheSettingsForm } from './CacheSettingsForm';
import { CacheCTA } from './CacheCTA';

interface RouteProps extends GrafanaRouteComponentProps<{ uid: string }> {}

function mapStateToProps(state: EnterpriseStoreState, props: RouteProps) {
  const dataSourceUid = props.match.params.uid;
  const dataSourceLoadingNav = getDataSourceLoadingNav('cache');

  return {
    ...state.dataSourceCache,
    navModel: getNavModel(state.navIndex, `datasource-cache-${dataSourceUid}`, dataSourceLoadingNav),
    pageId: dataSourceUid,
    isDefault: state.dataSources.dataSource.isDefault,
  };
}

const mapDispatchToProps = {
  disableDataSourceCache,
  updateDataSourceCache,
  enableDataSourceCache,
  loadDataSourceCache,
  loadDataSource,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type Props = ConnectedProps<typeof connector>;

export const Caching = (props: Props) => {
  const [enabled, setEnabled] = useState(props.enabled);
  const [loading, setLoading] = useState(true);
  const [useDefaultTTL, setUseDefaultTTL] = useState(props.useDefaultTTL);
  const [ttlMs, setTtlMs] = useState(props.ttlMs);

  const { navModel, pageId, loadDataSource, loadDataSourceCache } = props;

  useEffect(() => {
    setEnabled(props.enabled);
    setUseDefaultTTL(props.useDefaultTTL);
    setTtlMs(props.ttlMs);
    setLoading(false);
  }, [props.useDefaultTTL, props.ttlMs, props.enabled]);

  useEffect(() => {
    loadDataSource(pageId as any);
    loadDataSourceCache(pageId);
  }, [loadDataSourceCache, loadDataSource, pageId]);

  const content = enabled
    ? CacheSettingsForm({
        ...props,
        loading,
        useDefaultTTL,
        setUseDefaultTTL,
        ttlMs,
        setTtlMs,
      })
    : CacheCTA(props);

  return (
    <div>
      <PageHeader model={navModel} />
      <div className="page-container page-body">
        <div className="page-action-bar">
          <h3 className="page-sub-heading">Caching</h3>
          <div className="page-action-bar__spacer" />
          {enabled && <CacheSettingsDisable {...props} />}
        </div>
        {content}
      </div>
    </div>
  );
};

export default connector(Caching);
