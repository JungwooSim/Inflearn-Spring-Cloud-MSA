import React from 'react';
import { GroupActionComponents, RowActionComponents } from 'app/features/query/components/QueryActionComponent';
import { CreateRecordedQuery } from './RecordedQueryCreateModal';
import { RecordedQueryAddModal } from './RecordedQueryAddModal';
import { config } from '@grafana/runtime';
import { store, dispatch } from 'app/store/store';
import { getPrometheusWriteTarget } from './state/actions';
import { EnterpriseStoreState } from '../types';

const hasWriteTarget = (): boolean => {
  const state = store.getState() as EnterpriseStoreState;
  const target = state.recordedQueries.prometheusWriteTarget;
  return Boolean(target?.data_source_uid) && Boolean(target?.remote_write_path);
};

export function initRecordedQueries() {
  const showRecordQuery =
    config?.licenseInfo?.hasLicense && config?.recordedQueries?.enabled && config?.featureToggles?.recordedQueries;

  if (!showRecordQuery) {
    return;
  }

  dispatch(getPrometheusWriteTarget());

  RowActionComponents.addExtraRenderAction((props) =>
    hasWriteTarget() && props.dataSource?.meta.backend ? <CreateRecordedQuery {...props} /> : null
  );

  GroupActionComponents.addExtraRenderAction((props) =>
    hasWriteTarget() ? <RecordedQueryAddModal {...props} /> : null
  );
}
