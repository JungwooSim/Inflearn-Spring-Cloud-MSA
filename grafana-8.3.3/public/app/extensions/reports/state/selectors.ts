import { Report, ReportsState } from '../../types';

export const getReport = (state: ReportsState, currentReportId: any): Report | null => {
  if (state.report.id === parseInt(currentReportId, 10)) {
    return state.report;
  }

  return null;
};
