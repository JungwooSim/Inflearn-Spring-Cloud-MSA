import React from 'react';
import { DataSourcePluginOptionsEditorProps, DataSourceSettings } from '@grafana/data';
import { AlertingSettings, DataSourceHttpSettings } from '@grafana/ui';
import { LokiOptions } from '../types';
import { MaxLinesField } from './MaxLinesField';
import { DerivedFields } from './DerivedFields';
import { getAllAlertmanagerDataSources } from 'app/features/alerting/unified/utils/alertmanager';

export type Props = DataSourcePluginOptionsEditorProps<LokiOptions>;

const makeJsonUpdater = <T extends any>(field: keyof LokiOptions) => (
  options: DataSourceSettings<LokiOptions>,
  value: T
): DataSourceSettings<LokiOptions> => {
  return {
    ...options,
    jsonData: {
      ...options.jsonData,
      [field]: value,
    },
  };
};

const setMaxLines = makeJsonUpdater('maxLines');
const setDerivedFields = makeJsonUpdater('derivedFields');

export const ConfigEditor = (props: Props) => {
  const { options, onOptionsChange } = props;
  const alertmanagers = getAllAlertmanagerDataSources();

  return (
    <>
      <DataSourceHttpSettings
        defaultUrl={'http://localhost:3100'}
        dataSourceConfig={options}
        showAccessOptions={false}
        onChange={onOptionsChange}
      />

      <AlertingSettings<LokiOptions>
        alertmanagerDataSources={alertmanagers}
        options={options}
        onOptionsChange={onOptionsChange}
      />

      <div className="gf-form-group">
        <div className="gf-form-inline">
          <div className="gf-form">
            <MaxLinesField
              value={options.jsonData.maxLines || ''}
              onChange={(value) => onOptionsChange(setMaxLines(options, value))}
            />
          </div>
        </div>
      </div>

      <DerivedFields
        value={options.jsonData.derivedFields}
        onChange={(value) => onOptionsChange(setDerivedFields(options, value))}
      />
    </>
  );
};
