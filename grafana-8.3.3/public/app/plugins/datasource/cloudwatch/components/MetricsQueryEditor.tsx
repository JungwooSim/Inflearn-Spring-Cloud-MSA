import React, { PureComponent, ChangeEvent } from 'react';

import { QueryEditorProps } from '@grafana/data';
import { Input } from '@grafana/ui';
import {
  CloudWatchQuery,
  CloudWatchMetricsQuery,
  CloudWatchJsonData,
  MetricQueryType,
  MetricEditorMode,
} from '../types';
import { CloudWatchDatasource } from '../datasource';
import { Alias, MetricStatEditor, MathExpressionQueryField, SQLBuilderEditor, SQLCodeEditor } from './';

import EditorRow from './ui/EditorRow';
import EditorField from './ui/EditorField';
import { Space } from './ui/Space';
import QueryHeader from './QueryHeader';
import { isMetricsQuery } from '../guards';

export type Props = QueryEditorProps<CloudWatchDatasource, CloudWatchQuery, CloudWatchJsonData>;

interface State {
  sqlCodeEditorIsDirty: boolean;
}

export const normalizeQuery = ({
  namespace,
  metricName,
  expression,
  dimensions,
  region,
  id,
  alias,
  statistic,
  period,
  sqlExpression,
  metricQueryType,
  metricEditorMode,
  ...rest
}: CloudWatchMetricsQuery): CloudWatchMetricsQuery => {
  const normalizedQuery = {
    queryMode: 'Metrics' as const,
    namespace: namespace ?? '',
    metricName: metricName ?? '',
    expression: expression ?? '',
    dimensions: dimensions ?? {},
    region: region ?? 'default',
    id: id ?? '',
    alias: alias ?? '',
    statistic: statistic ?? 'Average',
    period: period ?? '',
    metricQueryType: metricQueryType ?? MetricQueryType.Search,
    metricEditorMode: metricEditorMode ?? MetricEditorMode.Builder,
    sqlExpression: sqlExpression ?? '',
    ...rest,
  };
  return !rest.hasOwnProperty('matchExact') ? { ...normalizedQuery, matchExact: true } : normalizedQuery;
};

export class MetricsQueryEditor extends PureComponent<Props, State> {
  state = {
    sqlCodeEditorIsDirty: false,
  };

  componentDidMount = () => {
    const metricsQuery = this.props.query as CloudWatchMetricsQuery;
    const query = normalizeQuery(metricsQuery);
    this.props.onChange(query);
  };

  onChange = (query: CloudWatchQuery) => {
    const { onChange, onRunQuery } = this.props;
    onChange(query);
    onRunQuery();
  };

  render() {
    const { onRunQuery, datasource } = this.props;
    const metricsQuery = this.props.query as CloudWatchMetricsQuery;
    const query = normalizeQuery(metricsQuery);

    return (
      <>
        <QueryHeader
          query={query}
          onRunQuery={onRunQuery}
          datasource={datasource}
          onChange={(newQuery) => {
            if (isMetricsQuery(newQuery) && newQuery.metricEditorMode !== query.metricEditorMode) {
              this.setState({ sqlCodeEditorIsDirty: false });
            }
            this.onChange(newQuery);
          }}
          sqlCodeEditorIsDirty={this.state.sqlCodeEditorIsDirty}
        />
        <Space v={0.5} />

        {query.metricQueryType === MetricQueryType.Search && (
          <>
            {query.metricEditorMode === MetricEditorMode.Builder && (
              <MetricStatEditor {...{ ...this.props, query }}></MetricStatEditor>
            )}
            {query.metricEditorMode === MetricEditorMode.Code && (
              <MathExpressionQueryField
                onRunQuery={onRunQuery}
                expression={query.expression ?? ''}
                onChange={(expression) => this.props.onChange({ ...query, expression })}
              ></MathExpressionQueryField>
            )}
          </>
        )}
        {query.metricQueryType === MetricQueryType.Query && (
          <>
            {query.metricEditorMode === MetricEditorMode.Code && (
              <SQLCodeEditor
                region={query.region}
                sql={query.sqlExpression ?? ''}
                onChange={(sqlExpression) => {
                  if (!this.state.sqlCodeEditorIsDirty) {
                    this.setState({ sqlCodeEditorIsDirty: true });
                  }
                  this.props.onChange({ ...metricsQuery, sqlExpression });
                }}
                onRunQuery={onRunQuery}
                datasource={datasource}
              />
            )}

            {query.metricEditorMode === MetricEditorMode.Builder && (
              <>
                <SQLBuilderEditor
                  query={query}
                  onChange={this.props.onChange}
                  onRunQuery={onRunQuery}
                  datasource={datasource}
                ></SQLBuilderEditor>
              </>
            )}
          </>
        )}
        <Space v={0.5} />
        <EditorRow>
          <EditorField
            label="ID"
            width={26}
            optional
            tooltip="ID can be used to reference other queries in math expressions. The ID can include numbers, letters, and underscore, and must start with a lowercase letter."
          >
            <Input
              onBlur={onRunQuery}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                this.onChange({ ...metricsQuery, id: event.target.value })
              }
              type="text"
              invalid={!!query.id && !/^$|^[a-z][a-zA-Z0-9_]*$/.test(query.id)}
              value={query.id}
            />
          </EditorField>

          <EditorField label="Period" width={26} tooltip="Minimum interval between points in seconds.">
            <Input
              value={query.period || ''}
              placeholder="auto"
              onBlur={onRunQuery}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                this.onChange({ ...metricsQuery, period: event.target.value })
              }
            />
          </EditorField>

          <EditorField
            label="Alias"
            width={26}
            optional
            tooltip="Change time series legend name using this field. See documentation for replacement variable formats."
          >
            <Alias
              value={metricsQuery.alias ?? ''}
              onChange={(value: string) => this.onChange({ ...metricsQuery, alias: value })}
            />
          </EditorField>
        </EditorRow>
      </>
    );
  }
}
