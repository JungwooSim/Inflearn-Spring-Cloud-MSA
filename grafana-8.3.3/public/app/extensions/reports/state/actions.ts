import { getBackendSrv, locationService } from '@grafana/runtime';
import { ThunkResult } from 'app/types';
import { Report, ReportDTO, SchedulingOptions } from '../../types';
import { reportLoaded, reportLoadingBegin, reportLoadingEnd, reportsLoaded } from './reducers';
import { backendSrv } from 'app/core/services/backend_srv';
import { DashboardModel } from 'app/features/dashboard/state';
import { cleanUpVariables, initVariablesTransaction } from 'app/features/variables/state/actions';
import { applyDefaultVariables } from '../utils';

const baseUrl = 'api/reports';

export function getReports(): ThunkResult<void> {
  return async (dispatch) => {
    const reports = await getBackendSrv().get(baseUrl);
    dispatch(reportsLoaded(reports));
  };
}

export function initVariables(dashboardUid: string, templateVars?: Report['templateVars']): ThunkResult<void> {
  return async (dispatch) => {
    const resp = await backendSrv.getDashboardByUid(dashboardUid);
    const dashboard = new DashboardModel(resp.dashboard, resp.meta);
    const list = applyDefaultVariables(dashboard.templating.list, templateVars);
    dispatch(cleanUpVariables());
    dispatch(initVariablesTransaction(resp.dashboard.uid, { ...dashboard, templating: { list } } as DashboardModel));
  };
}

export function loadReport(id: number): ThunkResult<void> {
  return async (dispatch) => {
    dispatch(reportLoadingBegin());
    try {
      const report = await getBackendSrv().get(`${baseUrl}/${id}`);
      if (report?.dashboardUid) {
        dispatch(initVariables(report.dashboardUid, report.templateVars));
      }
      dispatch(reportLoaded(report));
    } catch (e) {
      dispatch(reportLoadingEnd());
    }
  };
}

export function sendTestEmail(report: ReportDTO): Promise<any> {
  return getBackendSrv().post(`${baseUrl}/test-email/`, report);
}

export function deleteReport(id: number): ThunkResult<void> {
  return async (dispatch) => {
    await getBackendSrv().delete(`${baseUrl}/${id}`);
    dispatch(getReports());
  };
}

export function createReport(report: ReportDTO): ThunkResult<void> {
  return async (dispatch) => {
    try {
      await getBackendSrv().post(baseUrl, report);
    } catch (error) {
      throw error;
    }
    dispatch(getReports());
    locationService.push('/reports');
  };
}

export function updateReport(report: ReportDTO): ThunkResult<void> {
  return async (dispatch) => {
    const deprecatedFields = ['hour', 'minute', 'day'];
    report.schedule = Object.fromEntries(
      Object.entries(report.schedule).filter(([key, _]: [string, any]) => !deprecatedFields.includes(key) as unknown)
    ) as SchedulingOptions;
    await getBackendSrv().put(`${baseUrl}/${report.id}`, report);
    dispatch(getReports());
    locationService.push('/reports');
  };
}
