import React, { FC } from 'react';
import { connect } from 'react-redux';
import { ToolbarButton } from '@grafana/ui';
import { addCustomRightAction } from 'app/features/dashboard/components/DashNav/DashNav';
import { DashboardModel } from 'app/features/dashboard/state';
import { EnterpriseStoreState } from '../../types';
import { setDrawerOpen } from '../state/reducers';
import AnalyticsDrawer from './AnalyticsDrawer';

interface Props {
  dashboard?: DashboardModel;
  isDrawerOpen: boolean;
  setDrawerOpen: typeof setDrawerOpen;
}

export const AnalyticsContent: FC<Props> = ({ dashboard, isDrawerOpen, setDrawerOpen }) => {
  return (
    dashboard?.id &&
    dashboard.meta.url && (
      <>
        <ToolbarButton
          icon="info-circle"
          tooltip="Dashboard insights"
          onClick={() => {
            setDrawerOpen(true);
          }}
        />
        {isDrawerOpen && <AnalyticsDrawer dashboard={dashboard} />}
      </>
    )
  );
};

function mapStateToProps(state: EnterpriseStoreState) {
  return {
    isDrawerOpen: state.metaAnalytics.isDrawerOpen,
  };
}

const mapDispatchToProps = {
  setDrawerOpen,
};

export const initAnalyticsDrawer = () => {
  addCustomRightAction({
    show: () => true,
    component: connect(mapStateToProps, mapDispatchToProps)(AnalyticsContent),
    index: -1,
  });
};
