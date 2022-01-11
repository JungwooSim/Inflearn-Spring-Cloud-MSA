import '@testing-library/jest-dom';
import { DataSourcePickerProps } from '@grafana/runtime';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { RecordedQueryAddModalUnconnected } from './RecordedQueryAddModal';
import userEvent from '@testing-library/user-event';
import { IdDataQuery, RecordedQuery } from '../types';
import { act } from 'react-dom/test-utils';
import { DataSourceInstanceSettings, DataSourcePluginMeta, DataSourceSettings } from '@grafana/data';

function MockPicker(props: DataSourcePickerProps) {
  return <></>;
}

const settingsMock = jest.fn().mockReturnValue({ id: 36 });
jest.mock('@grafana/runtime', () => {
  const original = jest.requireActual('@grafana/runtime');
  const mockedRuntime = { ...original };

  mockedRuntime.getDataSourceSrv = () => {
    return {
      getInstanceSettings: settingsMock,
    };
  };

  mockedRuntime.DataSourcePicker = MockPicker;

  return mockedRuntime;
});

describe('with license and feature toggle', () => {
  it('renders the active recorded queries and the DataSourceFilter', () => {
    act(() => {
      render(
        <RecordedQueryAddModalUnconnected
          recordedQueries={queries}
          getRecordedQueriesAsync={() => {}}
          onChangeDataSource={() => {}}
          onAddQuery={() => {}}
          dataSource={dataSource}
        />
      );
    });

    userEvent.click(screen.getByText('Recorded query'));
    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByText('Recorded Query 1')).toBeInTheDocument();
    expect(screen.getByText('Recorded Query 3')).toBeInTheDocument();

    expect(screen.getByText('Filter by data source')).toBeInTheDocument();
  });

  it('filters datasources based on selected Datasource', () => {
    act(() => {
      render(
        <RecordedQueryAddModalUnconnected
          recordedQueries={queries}
          getRecordedQueriesAsync={() => {}}
          onChangeDataSource={() => {}}
          onAddQuery={() => {}}
          dataSource={dataSource}
          filterValue={{ id: 4 } as DataSourceSettings}
        />
      );
    });

    userEvent.click(screen.getByText('Recorded query'));
    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByText('Recorded Query 1')).toBeInTheDocument();
    expect(screen.queryByText('Recorded Query 3')).not.toBeInTheDocument();

    expect(screen.getByText('Filter by data source')).toBeInTheDocument();
  });

  it('adds checked recorded queries', async () => {
    const addFn = jest.fn();
    act(() => {
      render(
        <RecordedQueryAddModalUnconnected
          recordedQueries={queries}
          getRecordedQueriesAsync={() => {}}
          onChangeDataSource={() => {}}
          onAddQuery={addFn}
          dataSource={dataSource}
          filterValue={{ id: 4 } as DataSourceSettings}
        />
      );
    });

    userEvent.click(screen.getByText('Recorded query'));
    expect(screen.getByText('Add')).toBeInTheDocument();

    userEvent.click(screen.getAllByRole('checkbox')[0]);

    expect(screen.getByText('Add')).toBeEnabled();
    userEvent.click(screen.getByText('Add'));

    await waitFor(() => {
      expect(addFn).toHaveBeenCalledWith({
        datasource: '',
        exemplar: true,
        expr: 'Recorded Query 1{id="query-1", name="Recorded Query 1"}',
        interval: '',
        legendFormat: '',
      });
    });
  });
});

const queries: RecordedQuery[] = [
  {
    id: 'query-1',
    target_ref_id: 'A',
    name: 'Recorded Query 1',
    prom_name: 'Recorded Query 1',
    description: 'desc',
    range: 21600,
    count: false,
    interval: 10,
    active: true,
    dest_data_source_uid: '',
    queries: [{ datasourceId: 4 } as IdDataQuery],
  },
  {
    id: 'query-2',
    target_ref_id: 'A',
    name: 'Recorded Query 2',
    prom_name: 'Recorded Query 2',
    description: 'desc 2',
    range: 21600,
    count: true,
    interval: 10,
    active: false,
    dest_data_source_uid: '',
    queries: [{ datasourceId: 4 } as IdDataQuery],
  },
  {
    id: 'query-3',
    target_ref_id: 'A',
    name: 'Recorded Query 3',
    prom_name: 'Recorded Query 3',
    description: 'desc 3',
    range: 21600,
    count: true,
    interval: 10,
    active: true,
    dest_data_source_uid: '',
    queries: [{ datasourceId: 2 } as IdDataQuery],
  },
];

const dataSource: DataSourceInstanceSettings = {
  name: 'test data source',
  id: 4,
  uid: '',
  type: '',
  meta: {} as DataSourcePluginMeta,
  jsonData: {},
  access: 'direct',
};
