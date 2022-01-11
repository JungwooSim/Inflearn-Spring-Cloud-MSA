import React from 'react';
import { NavModel } from '@grafana/data';
import { render, screen } from '@testing-library/react';
import { ReportsListPage, Props } from './ReportsListPage';
import { getRouteComponentProps } from 'app/core/navigation/__mocks__/routeProps';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('app/core/config', () => {
  return {
    ...(jest.requireActual('app/core/config') as any),
    buildInfo: {},
    licenseInfo: {},
    rendererAvailable: true,
  };
});

jest.mock('app/core/core', () => {
  return {
    contextSrv: {
      hasPermission: () => true,
    },
  };
});

let getRendererMajorVersion: jest.Mock<number | null>;

jest.mock('./utils', () => {
  getRendererMajorVersion = jest.fn();
  return {
    getRendererMajorVersion,
  };
});

const setup = (rendererMajorVersion: number | null) => {
  getRendererMajorVersion.mockReturnValue(rendererMajorVersion);

  const props: Props = {
    ...getRouteComponentProps(),
    reports: [],
    reportCount: 0,
    hasFetched: true,
    navModel: { node: {}, main: {} } as NavModel,
    searchQuery: '',

    getReports: jest.fn(),
    deleteReport: jest.fn(),
    updateReport: jest.fn(),
  };

  render(<ReportsListPage {...props} />);
};

describe('ReportsListPage', () => {
  const warningMatcher = /using an old version of the image renderer/;

  it('should render a warning when the renderer version is too old', () => {
    setup(2);
    const header = screen.getByText(warningMatcher);

    expect(header).toBeInTheDocument();
  });

  it('should not render a warning when the renderer version is new enough', () => {
    setup(3);
    const header = screen.queryByText(warningMatcher);

    expect(header).not.toBeInTheDocument();
  });

  it('should not render a warning when the renderer version is unavailable', () => {
    setup(null);
    const header = screen.queryByText(warningMatcher);

    expect(header).not.toBeInTheDocument();
  });
});
