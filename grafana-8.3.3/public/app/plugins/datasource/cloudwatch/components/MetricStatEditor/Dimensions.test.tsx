import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { setupMockedDataSource } from '../../__mocks__/CloudWatchDataSource';
import '@testing-library/jest-dom';
import { CloudWatchMetricsQuery } from '../../types';
import userEvent from '@testing-library/user-event';
import { Dimensions } from '..';
import { within } from '@testing-library/dom';

const ds = setupMockedDataSource({
  variables: [],
});

ds.datasource.getNamespaces = jest.fn().mockResolvedValue([]);
ds.datasource.getMetrics = jest.fn().mockResolvedValue([]);
ds.datasource.getDimensionKeys = jest.fn().mockResolvedValue([]);
ds.datasource.getVariables = jest.fn().mockReturnValue([]);
const q: CloudWatchMetricsQuery = {
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
};

const props = {
  datasource: ds.datasource,
  query: q,
  disableExpressions: false,
  onChange: jest.fn(),
  onRunQuery: jest.fn(),
};
afterEach(cleanup);

describe('Dimensions', () => {
  describe('when rendered with two existing dimensions', () => {
    it('should render two filter items', async () => {
      props.query.dimensions = {
        InstanceId: '*',
        InstanceGroup: 'Group1',
      };
      render(<Dimensions {...props} query={props.query} dimensionKeys={[]} />);
      const filterItems = screen.getAllByTestId('cloudwatch-dimensions-filter-item');
      expect(filterItems.length).toBe(2);

      expect(within(filterItems[0]).getByText('InstanceId')).toBeInTheDocument();
      expect(within(filterItems[0]).getByText('*')).toBeInTheDocument();

      expect(within(filterItems[1]).getByText('InstanceGroup')).toBeInTheDocument();
      expect(within(filterItems[1]).getByText('Group1')).toBeInTheDocument();
    });
  });

  describe('when adding a new filter item', () => {
    it('it should add the new item but not call onChange', async () => {
      props.query.dimensions = {};
      const onChange = jest.fn();
      render(<Dimensions {...props} query={props.query} onChange={onChange} dimensionKeys={[]} />);

      userEvent.click(screen.getByLabelText('Add'));
      expect(screen.getByTestId('cloudwatch-dimensions-filter-item')).toBeInTheDocument();
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('when adding a new filter item with key', () => {
    it('it should add the new item but not call onChange', async () => {
      props.query.dimensions = {};
      const onChange = jest.fn();
      const { container } = render(
        <Dimensions {...props} query={props.query} onChange={onChange} dimensionKeys={[]} />
      );

      userEvent.click(screen.getByLabelText('Add'));
      const filterItemElement = screen.getByTestId('cloudwatch-dimensions-filter-item');
      expect(filterItemElement).toBeInTheDocument();

      const keyElement = container.querySelector('#cloudwatch-dimensions-filter-item-key');
      expect(keyElement).toBeInTheDocument();
      userEvent.type(keyElement!, 'my-key');
      fireEvent.keyDown(keyElement!, { keyCode: 13 });
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('when adding a new filter item with key and value', () => {
    it('it should add the new item and trigger onChange', async () => {
      props.query.dimensions = {};
      const onChange = jest.fn();
      const { container } = render(
        <Dimensions {...props} query={props.query} onChange={onChange} dimensionKeys={[]} />
      );

      userEvent.click(screen.getByLabelText('Add'));
      const filterItemElement = screen.getByTestId('cloudwatch-dimensions-filter-item');
      expect(filterItemElement).toBeInTheDocument();

      const keyElement = container.querySelector('#cloudwatch-dimensions-filter-item-key');
      expect(keyElement).toBeInTheDocument();
      userEvent.type(keyElement!, 'my-key');
      fireEvent.keyDown(keyElement!, { keyCode: 13 });
      expect(onChange).not.toHaveBeenCalled();

      const valueElement = container.querySelector('#cloudwatch-dimensions-filter-item-value');
      expect(valueElement).toBeInTheDocument();
      userEvent.type(valueElement!, 'my-value');
      fireEvent.keyDown(valueElement!, { keyCode: 13 });
      expect(onChange).not.toHaveBeenCalledWith({
        ...props.query,
        dimensions: {
          'my-key': 'my-value',
        },
      });
    });
  });
});
