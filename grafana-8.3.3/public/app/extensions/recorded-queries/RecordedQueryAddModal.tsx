import React, { useEffect, useState } from 'react';
import { AppEvents, DataQuery, DataSourceInstanceSettings, GrafanaTheme2 } from '@grafana/data';
import { css } from '@emotion/css';
import { Button, Checkbox, Modal, useStyles2 } from '@grafana/ui';
import { getRecordedQueriesAsync } from './state/actions';
import { connect, ConnectedProps } from 'react-redux';
import { getRecordedQueryItems } from './state/selectors';
import { EnterpriseStoreState, RecordedQuery } from '../types';
import { DataSourceFilter } from './DatasourceFilter';
import { QueryCard } from './QueryCard';
import { getDataSourceSrv } from '../../../../packages/grafana-runtime';
import { MIXED_DATASOURCE_NAME } from '../../plugins/datasource/mixed/MixedDataSource';
import { isEqual } from 'lodash';
import appEvents from '../../core/app_events';

function mapStateToProps(state: EnterpriseStoreState) {
  return {
    recordedQueries: getRecordedQueryItems(state.recordedQueries),
  };
}

interface OwnProps<TQuery extends DataQuery> {
  query?: TQuery;
  queries?: Array<Partial<TQuery>>;
  onAddQuery?: (query: TQuery) => void;
  onChangeDataSource?: (ds: DataSourceInstanceSettings) => void;
  dataSource?: DataSourceInstanceSettings;
  filterValue?: DataSourceSettings;
}

const mapDispatchToProps = {
  getRecordedQueriesAsync,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type Props<TQuery extends DataQuery> = OwnProps<TQuery> & ConnectedProps<typeof connector>;

export const RecordedQueryAddModalUnconnected = <TQuery extends DataQuery>({
  onAddQuery,
  getRecordedQueriesAsync,
  recordedQueries,
  onChangeDataSource,
  filterValue,
}: Props<TQuery>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDataSource, setSelectedDataSource] = useState<DataSourceSettings | undefined>(filterValue);
  const [toAdd, setToAdd] = useState<TQuery[]>([]);
  const styles = useStyles2(getStyles);
  useEffect(getRecordedQueriesAsync, [isOpen, getRecordedQueriesAsync]);

  const toggleQuery = (q: TQuery, added: boolean) => {
    if (added) {
      setToAdd(toAdd.concat(q));
    } else {
      setToAdd(toAdd.filter((current) => !isEqual(current, q)));
    }
  };

  const addQueries = async () => {
    const mixedDs = await getDataSourceSrv().getInstanceSettings(MIXED_DATASOURCE_NAME);
    await onChangeDataSource!(mixedDs!);

    toAdd.forEach((q) => {
      onAddQuery!(q);
    });

    setIsOpen(false);
    setToAdd([]);
    appEvents.emit(AppEvents.alertSuccess, [
      'Selected recorded queries added to the editor. The data source has been changed to mixed.',
    ]);
  };

  const queriesToDisplay = recordedQueries
    .filter((rq: RecordedQuery) => rq.active)
    .filter((rq: RecordedQuery) => !selectedDataSource || rq.queries[0].datasourceId === selectedDataSource.id)
    .map((rq) => (
      <AddQueryCard
        key={rq.id}
        onQueryToggle={toggleQuery}
        onChangeDataSource={onChangeDataSource!}
        recordedQuery={rq}
      />
    ));

  const closeModal = () => {
    setIsOpen(false);
    setToAdd([]);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button icon="plus" onClick={openModal} variant="secondary" className={styles.openButton}>
        Recorded query
      </Button>
      <Modal isOpen={isOpen} title={'Add recorded query'} onDismiss={closeModal} className={styles.modal}>
        <DataSourceFilter value={selectedDataSource?.name} onChange={setSelectedDataSource} />
        {queriesToDisplay.length > 0
          ? queriesToDisplay
          : selectedDataSource && (
              <div className={styles.noQueries}>No recorded queries available for {selectedDataSource?.name}</div>
            )}
        <div className={styles.modalButtons}>
          <Button variant={'secondary'} className={styles.modalButton} onClick={closeModal}>
            Cancel
          </Button>
          <Button variant={'primary'} className={styles.modalButton} onClick={addQueries} disabled={toAdd.length === 0}>
            Add
          </Button>
        </div>
      </Modal>
    </>
  );
};

interface AddProps<TQuery extends DataQuery> {
  onQueryToggle: (query: TQuery, enabled: boolean) => void;
  onChangeDataSource: (ds: DataSourceInstanceSettings) => void;
  recordedQuery: RecordedQuery;
}

const AddQueryCard = <TQuery extends DataQuery>({ onQueryToggle, recordedQuery }: AddProps<TQuery>) => {
  const [value, setValue] = useState<boolean>(false);
  const query = ({
    expr: `${recordedQuery.prom_name}{id="${recordedQuery.id}", name="${recordedQuery.name}"}`,
    legendFormat: '',
    interval: '',
    exemplar: true,
    datasource: recordedQuery.dest_data_source_uid,
  } as unknown) as TQuery;
  return (
    <QueryCard
      key={recordedQuery.id}
      recordedQuery={recordedQuery}
      buttons={[
        <Checkbox
          name={recordedQuery.id}
          value={value}
          key={`${recordedQuery.id}-checked`}
          onChange={() => {
            onQueryToggle(query, !value);
            setValue(!value);
          }}
        />,
      ]}
    />
  );
};

interface DataSourceSettings {
  name: string;
  id: number;
}

const getStyles = (theme: GrafanaTheme2) => {
  return {
    modalButtons: css`
      display: flex;
      justify-content: end;
    `,
    openButton: css`
      margin-left: -8px;
    `,
    modalButton: css`
      margin-left: ${theme.spacing(1)};
    `,
    modal: css`
      width: 750px;
    `,
    noQueries: css`
      margin-left: ${theme.spacing(1)};
      margin-bottom: ${theme.spacing(3)};
    `,
  };
};

export const RecordedQueryAddModal = connector(RecordedQueryAddModalUnconnected);
