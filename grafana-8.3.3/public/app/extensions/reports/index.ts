import { addDashboardShareTab, ShareModalTabModel } from 'app/features/dashboard/components/ShareModal';
import { SharePDF } from './SharePDF';
import { CreateReportTab } from './CreateReportTab';
import { contextSrv } from 'app/core/services/context_srv';
import { AccessControlAction } from '../types';

const sharePDFTab: ShareModalTabModel = {
  label: 'PDF',
  value: 'pdf',
  component: SharePDF,
};

const createReportTab: ShareModalTabModel = {
  label: 'Report',
  value: 'report',
  component: CreateReportTab,
};

export function initReporting() {
  addDashboardShareTab(sharePDFTab);
  if (contextSrv.hasPermission(AccessControlAction.ReportingAdminCreate)) {
    addDashboardShareTab(createReportTab);
  }
}
