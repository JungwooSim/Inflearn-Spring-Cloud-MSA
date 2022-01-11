import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { config } from 'app/core/config';
import { contextSrv } from 'app/core/core';
import { SlideDown } from 'app/core/components/Animations/SlideDown';
import EmptyListCTA from 'app/core/components/EmptyListCTA/EmptyListCTA';
import { AclTarget, AddDataSourcePermissions, State as AddState } from './AddDataSourcePermissions';
import { DataSourcePermissionsList } from './DataSourcePermissionsList';
import { loadDataSource } from 'app/features/datasources/state/actions';
import {
  addDataSourcePermission,
  disableDataSourcePermissions,
  enableDataSourcePermissions,
  loadDataSourcePermissions,
  removeDataSourcePermission,
} from './state/actions';
import { AccessControlAction, DataSourcePermission, EnterpriseStoreState } from '../types';
import { AccessControlAction as OSSAccessControlAction } from 'app/types';
import PageHeader from 'app/core/components/PageHeader/PageHeader';
import { getNavModel } from 'app/core/selectors/navModel';
import { getDataSourceLoadingNav } from 'app/features/datasources/state/navModel';
import { Alert, Button } from '@grafana/ui';
import { GrafanaRouteComponentProps } from 'app/core/navigation/types';

interface RouteProps extends GrafanaRouteComponentProps<{ id: string }> {}

function mapStateToProps(state: EnterpriseStoreState, props: RouteProps) {
  const dataSourceId = parseInt(props.match.params.id, 10);
  const dataSourceLoadingNav = getDataSourceLoadingNav('permissions');
  return {
    navModel: getNavModel(state.navIndex, `datasource-permissions-${dataSourceId}`, dataSourceLoadingNav),
    pageId: dataSourceId,
    permissions: state.dataSourcePermission.permissions,
    enabled: state.dataSourcePermission.enabled,
    isDefault: state.dataSources.dataSource.isDefault,
  };
}

const mapDispatchToProps = {
  addDataSourcePermission,
  enableDataSourcePermissions,
  disableDataSourcePermissions,
  loadDataSourcePermissions,
  loadDataSource,
  removeDataSourcePermission,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type Props = ConnectedProps<typeof connector>;

interface State {
  isAdding: boolean;
}

export class DataSourcePermissions extends PureComponent<Props, State> {
  state: State = {
    isAdding: false,
  };

  componentDidMount() {
    this.fetchDataSource();
    this.fetchDataSourcePermissions();
  }

  async fetchDataSourcePermissions() {
    const { pageId, loadDataSourcePermissions } = this.props;

    return loadDataSourcePermissions(pageId);
  }

  async fetchDataSource() {
    const { pageId, loadDataSource } = this.props;

    return loadDataSource(pageId as any);
  }

  onOpenAddPermissions = () => {
    this.setState({
      isAdding: true,
    });
  };

  onEnablePermissions = () => {
    const { pageId, enableDataSourcePermissions } = this.props;
    enableDataSourcePermissions(pageId);
  };

  onDisablePermissions = () => {
    const { pageId, disableDataSourcePermissions } = this.props;

    disableDataSourcePermissions(pageId);
  };

  onAddPermission = (state: AddState) => {
    const { pageId, addDataSourcePermission } = this.props;
    const data = {
      permission: state.permission,
    };

    if (state.type === AclTarget.Team) {
      addDataSourcePermission(pageId, Object.assign(data, { teamId: state.teamId }));
    } else if (state.type === AclTarget.User) {
      addDataSourcePermission(pageId, Object.assign(data, { userId: state.userId }));
    } else if (state.type === AclTarget.BuiltinRole) {
      addDataSourcePermission(pageId, Object.assign(data, { builtinRole: state.builtinRole }));
    }
  };

  onRemovePermission = (item: DataSourcePermission) => {
    this.props.removeDataSourcePermission(item.datasourceId, item.id);
  };

  onCancelAddPermission = () => {
    this.setState({
      isAdding: false,
    });
  };

  isEnabled = () => {
    return config.featureToggles['accesscontrol'] || this.props.enabled;
  };

  renderActions = () => {
    const actions = [];
    const { isAdding } = this.state;
    const canCreateDataSourcePermissions = contextSrv.hasPermission(AccessControlAction.DataSourcesPermissionsCreate);
    const canToggleDataSourcePermissions = contextSrv.hasPermission(AccessControlAction.DataSourcesPermissionsToggle);

    if (this.isEnabled()) {
      actions.push(
        <Button
          variant={'primary'}
          key="add-permission"
          onClick={this.onOpenAddPermissions}
          disabled={isAdding || !canCreateDataSourcePermissions}
        >
          Add a permission
        </Button>
      );
    }

    if (!config.featureToggles['accesscontrol']) {
      actions.push(
        <Button
          variant={'destructive'}
          key="disable-permissions"
          onClick={this.onDisablePermissions}
          disabled={!canToggleDataSourcePermissions}
        >
          Disable permissions
        </Button>
      );
    }

    return actions;
  };

  renderMissingReadUserRightsMessage = () => {
    return (
      <Alert severity="info" title="Missing rights">
        You are not allowed to view users in your organization. Please contact your server administrator.
      </Alert>
    );
  };

  render() {
    const canToggleDataSourcePermissions = contextSrv.hasPermission(AccessControlAction.DataSourcesPermissionsToggle);
    const canReadDataSourcePermissions = contextSrv.hasPermission(AccessControlAction.DataSourcesPermissionsRead);
    const canReadOrgUsersPermissions = contextSrv.hasPermission(OSSAccessControlAction.OrgUsersRead);
    const { permissions, navModel, isDefault } = this.props;
    const { isAdding } = this.state;

    return (
      <div>
        <PageHeader model={navModel} />
        <div className="page-container page-body">
          <div className="page-action-bar">
            <h3 className="page-sub-heading">Permissions</h3>
            <div className="page-action-bar__spacer" />
            {this.renderActions()}
          </div>

          {isDefault && !this.isEnabled() && (
            <Alert title="Warning!">
              Enabling permissions on the default data source makes it unavailable for users not listed in the
              permissions.
            </Alert>
          )}
          {!canReadOrgUsersPermissions && isAdding && this.renderMissingReadUserRightsMessage()}
          {!this.isEnabled() ? (
            <EmptyListCTA
              title="Permissions not enabled for this data source."
              buttonTitle="Enable"
              buttonIcon="unlock"
              buttonDisabled={!canToggleDataSourcePermissions}
              onClick={this.onEnablePermissions}
              proTip="Only admins will be able to query the data source after you enable permissions."
              proTipLink="http://docs.grafana.org/permissions/datasource_permissions/"
              proTipLinkTitle="Learn more"
            />
          ) : (
            <div>
              <SlideDown in={isAdding}>
                <AddDataSourcePermissions
                  onAddPermission={(state) => this.onAddPermission(state)}
                  onCancel={this.onCancelAddPermission}
                />
              </SlideDown>
              {canReadDataSourcePermissions && (
                <DataSourcePermissionsList items={permissions} onRemoveItem={this.onRemovePermission} />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connector(DataSourcePermissions);
