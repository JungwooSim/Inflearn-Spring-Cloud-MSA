import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { setupMockedDataSource } from '../__mocks__/CloudWatchDataSource';
import { CloudWatchAnnotationQuery } from '../types';
import { AnnotationQueryEditor } from './AnnotationQueryEditor';
import { act } from 'react-dom/test-utils';

const ds = setupMockedDataSource({
  variables: [],
});

const q: CloudWatchAnnotationQuery = {
  id: '',
  region: 'us-east-2',
  namespace: '',
  period: '',
  alias: '',
  metricName: '',
  dimensions: {},
  matchExact: true,
  statistic: '',
  expression: '',
  refId: '',
  enable: true,
  name: '',
  iconColor: '',
  prefixMatching: false,
  actionPrefix: '',
  alarmNamePrefix: '',
};

ds.datasource.getRegions = jest.fn().mockResolvedValue([]);
ds.datasource.getNamespaces = jest.fn().mockResolvedValue([]);
ds.datasource.getMetrics = jest.fn().mockResolvedValue([]);
ds.datasource.getDimensionKeys = jest.fn().mockResolvedValue([]);
ds.datasource.getVariables = jest.fn().mockReturnValue([]);

const props = {
  datasource: ds.datasource,
  query: q,
  onChange: jest.fn(),
  onRunQuery: jest.fn(),
};

afterEach(cleanup);

describe('AnnotationQueryEditor', () => {
  it('should not display match exact switch', () => {
    render(<AnnotationQueryEditor {...props} />);
    expect(screen.queryByText('Match exact')).toBeNull();
  });

  it('shoud not display wildcard option in dimension value dropdown', async () => {
    ds.datasource.getDimensionValues = jest.fn().mockResolvedValue([[{ label: 'dimVal1', value: 'dimVal1' }]]);
    props.query.dimensions = { instanceId: 'instance-123' };
    render(<AnnotationQueryEditor {...props} />);

    const valueElement = screen.getByText('instance-123');
    expect(valueElement).toBeInTheDocument();
    expect(screen.queryByText('*')).toBeNull();
    act(async () => {
      await valueElement.click();
      await waitFor(() => {
        expect(screen.queryByText('*')).toBeNull();
      });
    });
  });
});
