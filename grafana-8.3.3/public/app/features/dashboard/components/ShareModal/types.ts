import React from 'react';
import { DashboardModel, PanelModel } from 'app/features/dashboard/state';

export interface ShareModalTabProps {
  dashboard: DashboardModel;
  panel?: PanelModel;
  onDismiss?(): void;
}

export interface ShareModalTabModel {
  label: string;
  value: string;
  component: React.ComponentType<ShareModalTabProps>;
}
