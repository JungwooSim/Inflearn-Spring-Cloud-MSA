import React from 'react';
import { render, screen } from '@testing-library/react';
import selectEvent from 'react-select-event';
import { AddDataSourcePermissions, Props, AclTarget } from './AddDataSourcePermissions';
import { config } from 'app/core/config';

jest.mock('app/core/core', () => {
  return {
    contextSrv: {
      hasPermission: () => true,
    },
  };
});

jest.mock('@grafana/runtime', () => ({
  getBackendSrv: () => {
    return {
      get: () => {
        return Promise.resolve([]);
      },
    };
  },
}));

jest.mock('app/core/config', () => {
  return {
    config: {
      featureToggles: {},
    },
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

const setup = () => {
  const props: Props = {
    onAddPermission: jest.fn(),
    onCancel: jest.fn(),
  };

  render(<AddDataSourcePermissions {...props} />);
};

const selectTarget = async (target: string) => {
  await selectEvent.select(screen.getByLabelText('Role to add new permission to'), target, {
    container: document.body,
  });
};

describe('Render', () => {
  it('should render component', () => {
    setup();

    expect(screen.getByText(/add permission for/i)).toBeInTheDocument();
  });

  it('should render user picker', async () => {
    setup();

    await selectTarget(AclTarget.User);
    expect(screen.getByTestId('userPicker')).toBeInTheDocument();
  });

  it('should render team picker', async () => {
    setup();

    await selectTarget(AclTarget.Team);
    expect(screen.getByTestId('teamPicker')).toBeInTheDocument();
  });

  it('should render role picker', async () => {
    config.featureToggles.accesscontrol = true;
    setup();
    await selectTarget('Role');
    expect(screen.getByLabelText('Built-in role picker')).toBeInTheDocument();
  });

  it('should render 2 options when access control is disabled', async () => {
    config.featureToggles.accesscontrol = false;
    setup();
    await selectEvent.openMenu(screen.getByLabelText('Role to add new permission to'));
    expect(screen.getAllByLabelText('Select option')).toHaveLength(2);
  });

  it('should render 3 options when access control is enabled', async () => {
    config.featureToggles.accesscontrol = true;
    setup();
    await selectEvent.openMenu(screen.getByLabelText('Role to add new permission to'));
    expect(screen.getAllByLabelText('Select option')).toHaveLength(3);
  });
});
