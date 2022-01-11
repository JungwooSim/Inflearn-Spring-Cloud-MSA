import React, { PureComponent } from 'react';
import { Button, Form, HorizontalGroup, Select } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { UserPicker } from 'app/core/components/Select/UserPicker';
import { TeamPicker } from 'app/core/components/Select/TeamPicker';
import { CloseButton } from 'app/core/components/CloseButton/CloseButton';
import { dataSourceAclLevels, DataSourcePermissionLevel, OrgRole } from 'app/types/acl';
import { AccessControlAction, Team } from 'app/types';
import { contextSrv } from 'app/core/core';
import { config } from 'app/core/config';

export enum AclTarget {
  Team = 'Team',
  User = 'User',
  BuiltinRole = 'builtinRole',
}

const roles = [OrgRole.Admin, OrgRole.Editor, OrgRole.Viewer];

export interface Props {
  onAddPermission: (state: State) => void;
  onCancel: () => void;
}

export interface State {
  userId: number;
  teamId: number;
  builtinRole: string;
  type: AclTarget;
  permission: DataSourcePermissionLevel;
}

export class AddDataSourcePermissions extends PureComponent<Props, State> {
  cleanState(): State {
    return {
      userId: 0,
      teamId: 0,
      builtinRole: '',
      type: AclTarget.Team,
      permission: DataSourcePermissionLevel.Query,
    };
  }

  state: State = this.cleanState();

  isValid() {
    switch (this.state.type) {
      case AclTarget.Team:
        return this.state.teamId > 0;
      case AclTarget.User:
        return this.state.userId > 0;
      case AclTarget.BuiltinRole:
        return roles.some((r) => r === this.state.builtinRole);
    }
    return true;
  }

  onTeamSelected = (team: SelectableValue<Team>) => {
    const value = team?.value;
    this.setState({ teamId: value ? value.id : 0 });
  };

  onUserSelected = (user: SelectableValue<number>) => {
    this.setState({ userId: user ? user.id : 0 });
  };

  onBuiltinRoleSelected = (builtinRole: SelectableValue<string>) => {
    this.setState({ builtinRole: builtinRole ? builtinRole.value! : '' });
  };

  onPermissionChanged = (permission: SelectableValue<DataSourcePermissionLevel>) => {
    this.setState({ permission: permission.value! });
  };

  onTypeChanged = (item: SelectableValue<AclTarget>) => {
    this.setState({ type: item.value!, userId: 0, teamId: 0 });
  };

  onSubmit = async () => {
    await this.props.onAddPermission(this.state);
    this.setState(this.cleanState());
  };

  render() {
    const { onCancel } = this.props;
    const { type } = this.state;
    const canListOrgUsers = contextSrv.hasPermission(AccessControlAction.OrgUsersRead);
    const pickerClassName = 'width-20';

    const aclTargets = [
      { value: AclTarget.Team, label: 'Team' },
      { value: AclTarget.User, label: 'User', isDisabled: !canListOrgUsers },
    ];

    if (config.featureToggles['accesscontrol']) {
      aclTargets.push({ value: AclTarget.BuiltinRole, label: 'Role' });
    }

    return (
      <div className="cta-form" aria-label="Permissions slider">
        <CloseButton onClick={onCancel} />
        <h5>Add Permission For</h5>
        <Form name="addPermission" maxWidth="none" onSubmit={this.onSubmit}>
          {() => (
            <HorizontalGroup>
              <Select
                aria-label="Role to add new permission to"
                isSearchable={false}
                value={type}
                options={aclTargets}
                onChange={this.onTypeChanged}
                menuShouldPortal
              />

              {type === AclTarget.User && <UserPicker onSelected={this.onUserSelected} className={pickerClassName} />}

              {type === AclTarget.Team && <TeamPicker onSelected={this.onTeamSelected} className={pickerClassName} />}

              {type === AclTarget.BuiltinRole && (
                <Select
                  aria-label={'Built-in role picker'}
                  menuShouldPortal
                  options={roles.map((r) => ({ value: r, label: r }))}
                  onChange={this.onBuiltinRoleSelected}
                  width={40}
                />
              )}

              <Select
                isSearchable={false}
                options={dataSourceAclLevels}
                onChange={this.onPermissionChanged}
                value={dataSourceAclLevels.find((l) => l.value === this.state.permission)}
                width={25}
                menuShouldPortal
              />
              <Button type="submit" disabled={!this.isValid()}>
                Save
              </Button>
            </HorizontalGroup>
          )}
        </Form>
      </div>
    );
  }
}
