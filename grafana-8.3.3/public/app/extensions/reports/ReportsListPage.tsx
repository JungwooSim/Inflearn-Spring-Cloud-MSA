import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Page from 'app/core/components/Page/Page';
import EmptyListCTA from 'app/core/components/EmptyListCTA/EmptyListCTA';
import { ReportList } from './ReportsList';
import { NoRendererInfoBox, OldRendererInfoBox } from './RenderingWarnings';
import { getNavModel } from 'app/core/selectors/navModel';
import { getReports, deleteReport, updateReport } from './state/actions';
import { EnterpriseStoreState, Report, AccessControlAction } from '../types';
import config from 'app/core/config';
import { Icon, Input, LinkButton } from '@grafana/ui';
import { isExpired } from '../utils';
import { getRendererMajorVersion } from './utils';
import { UnavailableFeatureInfoBox } from './UnavailableFeatureInfoBox';
import { contextSrv } from 'app/core/core';

function mapStateToProps(state: EnterpriseStoreState) {
  return {
    navModel: getNavModel(state.navIndex, 'reports-list'),
    reports: state.reports.reports,
    hasFetched: state.reports.hasFetchedList,
    searchQuery: state.reports.searchQuery,
    reportCount: state.reports.reportCount,
  };
}

const mapDispatchToProps = {
  getReports,
  deleteReport,
  updateReport,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type Props = ConnectedProps<typeof connector>;

export const ReportsListPage = ({
  getReports,
  deleteReport,
  updateReport,
  reports,
  reportCount,
  hasFetched,
  navModel,
}: Props) => {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getReports();
  }, [getReports]);

  const onDeleteReport = (report: Report) => {
    deleteReport(report.id);
  };

  const renderList = () => {
    const { rendererAvailable } = config;
    const rendererMajorVersion = getRendererMajorVersion();
    const canCreateReport = contextSrv.hasPermission(AccessControlAction.ReportingAdminCreate);
    const enableNewReport = rendererAvailable && canCreateReport;

    if (isExpired()) {
      return (
        <>
          <UnavailableFeatureInfoBox
            message="Creating new reports is not available with an expired license.
              Existing reports continue to be processed but you need to update your license to create a new one."
          />
          {reportCount > 0 && (
            <ReportList reports={reports} deleteReport={onDeleteReport} updateReport={updateReport} filter={filter} />
          )}
        </>
      );
    }

    return (
      <>
        {!rendererAvailable && <NoRendererInfoBox variant="error" />}
        {rendererAvailable && rendererMajorVersion !== null && rendererMajorVersion < 3 && <OldRendererInfoBox />}
        {reportCount > 0 ? (
          <>
            <div className="page-action-bar">
              <div className="gf-form gf-form--grow">
                <Input
                  placeholder={'Search reports by report name, dashboard name or recipients'}
                  prefix={<Icon name={'search'} />}
                  width={56}
                  onChange={(e) => setFilter((e.target as HTMLInputElement).value)}
                />
                <div className="page-action-bar__spacer" />
                <LinkButton variant="primary" href="reports/new" disabled={!enableNewReport} icon={'plus'}>
                  Create a new report
                </LinkButton>
              </div>
            </div>
            <ReportList reports={reports} deleteReport={onDeleteReport} updateReport={updateReport} filter={filter} />
          </>
        ) : (
          rendererAvailable && (
            <EmptyListCTA
              title="You haven't created any reports yet."
              buttonIcon="envelope"
              buttonLink="reports/new"
              buttonTitle="Create a new report"
              buttonDisabled={!enableNewReport}
              proTip=""
              proTipLink=""
              proTipLinkTitle=""
              proTipTarget="_blank"
            />
          )
        )}
      </>
    );
  };

  return (
    <Page navModel={navModel}>
      <Page.Contents isLoading={!hasFetched}>{renderList()}</Page.Contents>
    </Page>
  );
};

export default connector(ReportsListPage);
