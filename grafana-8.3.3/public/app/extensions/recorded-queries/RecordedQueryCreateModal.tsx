import React, { useState } from 'react';
import { css } from '@emotion/css';
import { getDataSourceSrv } from '@grafana/runtime';
import {
  Alert,
  AlertVariant,
  Button,
  Field,
  Form,
  Icon,
  InlineField,
  Input,
  InputControl,
  Modal,
  Switch,
  useStyles2,
} from '@grafana/ui';
import {
  AppEvents,
  DataQuery,
  DataSourceInstanceSettings,
  GrafanaTheme2,
  ScopedVars,
  VariableModel,
} from '@grafana/data';
import { QueryOperationAction } from 'app/core/components/QueryOperationRow/QueryOperationAction';
import { IdDataQuery, RecordedQuery } from '../types/recordedQuery';
import { saveRecordedQuery, testRecordedQuery } from './state/actions';
import appEvents from 'app/core/app_events';
import { getVariables } from 'app/features/variables/state/selectors';
import { EnterpriseStoreState } from '../types';
import { connect, ConnectedProps } from 'react-redux';
import { hasOptions } from 'app/features/variables/guard';
import { variableAdapters } from 'app/features/variables/adapters';
import { VariableHide } from 'app/features/variables/types';
import { timeIntervals, TimeSelect } from './TimeSelect';

function mapStateToProps(state: EnterpriseStoreState) {
  return {
    variables: getVariables(state),
  };
}

interface OwnProps {
  query?: DataQuery;
  queries?: Array<Partial<DataQuery>>;
  onAddQuery?: (query: DataQuery) => void;
  onChangeDataSource?: (ds: DataSourceInstanceSettings) => void;
  dataSource?: DataSourceInstanceSettings;
}

const connector = connect(mapStateToProps);
export type Props = ConnectedProps<typeof connector> & OwnProps;

interface SaveAddRecordedQuery {
  name: string;
  description: string;
  aggregationType: string;
  interval: number;
  range: number;
  isCount: boolean;
}

export const CreateRecordedQueryUnconnected = ({ query, queries, dataSource, variables: propVariables }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertVariant>('info');
  const [alertMessage, setAlertMessage] = useState('');
  const styles = useStyles2(getStyles);

  const closeModal = () => {
    setAlertMessage('');
    setAlertSeverity('info');
    setIsOpen(false);
  };

  const submitForm = async (data: SaveAddRecordedQuery) => {
    saveRecordedQuery(await toRecordedQuery(data, variables))
      .then(() => {
        closeModal();
        appEvents.emit(AppEvents.alertSuccess, [`Created recorded query: ${data.name}`]);
      })
      .catch((error) => {
        appEvents.emit(AppEvents.alertError, [error.data.message]);
      });
  };

  const toRecordedQuery = async (data: SaveAddRecordedQuery, scopedVars: ScopedVars | {}): Promise<RecordedQuery> => {
    const rq = {
      target_ref_id: query ? query.refId : '',
      name: data.name,
      description: data.description,
      interval: data.interval,
      range: data.range,
      count: data.isCount,
      active: true,
    } as RecordedQuery;
    const queriesWithVars = queries?.map(async (q) => {
      const dataSourceName = q.datasource || dataSource?.name;
      const ds = await getDataSourceSrv().get(dataSourceName);
      const interpolatedTarget = ds.interpolateVariablesInQueries
        ? ds.interpolateVariablesInQueries([q as DataQuery], { ...scopedVars })[0]
        : q;

      const idQ = interpolatedTarget as IdDataQuery;
      idQ.datasourceId = ds ? ds.id : -1;
      return idQ;
    });
    rq.queries = queriesWithVars ? await Promise.all(queriesWithVars) : [];
    return rq;
  };

  const variables = propVariables?.filter((variable) => variable.hide !== VariableHide.hideVariable);
  const title = (
    <h2>
      {'Create recorded query'}
      <a
        href="https://grafana.com/docs/grafana/latest/enterprise/recorded-queries/#create-a-recorded-query"
        className={styles.docsLink}
        target="_blank"
        rel="noreferrer"
      >
        <Icon name="info-circle" />
      </a>
    </h2>
  );

  return (
    <>
      <QueryOperationAction
        title="Create recorded query"
        icon="history"
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <Modal
        isOpen={isOpen}
        title={title}
        onDismiss={closeModal}
        className={css`
          width: 500px;
        `}
      >
        <Form onSubmit={submitForm} validateOn="all">
          {({ register, errors, control, getValues }) => (
            <>
              <Field
                label="Name"
                description={'Give this query a name'}
                invalid={!!errors.name}
                error={errors.name?.message}
                required={true}
              >
                <Input
                  {...register('name', { required: { value: true, message: 'Name is required' } })}
                  id="add-recorded-query-name"
                  autoFocus
                />
              </Field>
              <Field label="Description" description={'Provide a description for this query'}>
                <Input {...register('description')} id="add-recorded-query-desc" />
              </Field>
              <InputControl
                name="interval"
                control={control}
                defaultValue={timeIntervals[0].value}
                render={({ field: { ref, value, onChange, ...field } }) => {
                  return (
                    <TimeSelect
                      label={'Interval'}
                      description={'Decide how often the query will be recorded'}
                      value={value}
                      onChange={onChange}
                    />
                  );
                }}
              />
              <InputControl
                name="range"
                control={control}
                defaultValue={timeIntervals[0].value}
                render={({ field: { ref, value, onChange, ...field } }) => {
                  return (
                    <TimeSelect
                      label={'Time Range'}
                      description={'Select the time range for the query'}
                      value={value}
                      onChange={onChange}
                    />
                  );
                }}
              />
              {variables?.length > 0 ? (
                <Field label="Template variables" description="Select a value for each template variable">
                  <>
                    {variables.map((variable) => {
                      const { picker: Picker, setValue } = variableAdapters.get(variable.type);
                      return (
                        <InlineField label={variable.name} key={variable.name} labelWidth={16}>
                          <Picker
                            onVariableChange={(updated: VariableModel) => {
                              if (hasOptions(updated)) {
                                setValue(updated, updated.current);
                              }
                            }}
                            variable={variable}
                          />
                        </InlineField>
                      );
                    })}
                  </>
                </Field>
              ) : null}
              <Field
                label="Count query results"
                description={
                  'If the query returns a single result, that will be recorded. If it returns multiple results, use this button to get a count of them.'
                }
              >
                <Switch {...register('isCount')} id="add-recorded-query-count" />
              </Field>
              <Alert
                severity={alertSeverity}
                title={'Test this recorded query'}
                buttonContent={
                  <div aria-label="Test the recorded query">
                    <Icon name="sync" />
                  </div>
                }
                onRemove={async () => {
                  testRecordedQuery(await toRecordedQuery(getValues(), variables))
                    .then((value) => {
                      setAlertSeverity('info');
                      setAlertMessage(`Result: ${value.data.message}`);
                    })
                    .catch((error) => {
                      setAlertSeverity('error');
                      setAlertMessage(error.data.message);
                    });
                }}
              >
                <>{alertMessage}</>
              </Alert>
              <Modal.ButtonRow>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={closeModal}
                  fill="outline"
                  aria-label="Cancel recording query button"
                >
                  Cancel
                </Button>
                <Button type="submit" aria-label="Start recording query button">
                  Start recording query
                </Button>
              </Modal.ButtonRow>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};

const getStyles = (theme: GrafanaTheme2) => {
  return {
    docsLink: css`
      margin-left: ${theme.spacing(1)};
    `,
  };
};

export const CreateRecordedQuery = connector(CreateRecordedQueryUnconnected);
