import React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { useAsync } from 'react-use';
import { NavModel } from '@grafana/data';
import { Button, Form } from '@grafana/ui';
import { getBackendSrv, locationService } from '@grafana/runtime';
import config from 'app/core/config';
import { getNavModel } from 'app/core/selectors/navModel';
import Page from 'app/core/components/Page/Page';
import { ErrorPage } from 'app/core/components/ErrorPage/ErrorPage';
import { EnterpriseStoreState, ReportsSettings, AccessControlAction } from '../types';
import ReportBranding from './ReportBranding';
import { NoRendererInfoBox } from './RenderingWarnings';
import { contextSrv } from 'app/core/core';

interface OwnProps {}

interface ConnectedProps {
  navModel: NavModel;
}

export type Props = ConnectedProps & OwnProps;

export const ReportsSettingsPage = ({ navModel }: Props) => {
  const { value: settings, loading, error } = useAsync(async () => {
    return getBackendSrv().get('/api/reports/settings');
  });

  const submitForm = (settingsData: ReportsSettings) => {
    getBackendSrv()
      .post('/api/reports/settings', settingsData)
      .then(() => locationService.push('/reports'));
  };

  if (error) {
    return <ErrorPage navModel={navModel} />;
  }

  const canEditSettings = contextSrv.hasPermission(AccessControlAction.ReportingSettingsWrite);

  return (
    <Page navModel={navModel}>
      <Page.Contents isLoading={loading}>
        {!config.rendererAvailable ? (
          <NoRendererInfoBox variant="error" />
        ) : (
          <Form onSubmit={submitForm} validateOn="onBlur">
            {(formProps) => {
              return (
                <>
                  <ReportBranding settings={settings} {...formProps} />
                  <Button type="submit" size="md" variant="primary" disabled={!canEditSettings}>
                    Save
                  </Button>
                </>
              );
            }}
          </Form>
        )}
      </Page.Contents>
    </Page>
  );
};

const mapStateToProps: MapStateToProps<ConnectedProps, OwnProps, EnterpriseStoreState> = (state) => {
  return {
    navModel: getNavModel(state.navIndex, 'reports-settings'),
  };
};

export default connect(mapStateToProps)(ReportsSettingsPage);
