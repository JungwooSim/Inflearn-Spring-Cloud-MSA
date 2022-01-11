import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dateTime, TimeRange } from '@grafana/data';
import { FooterMode, IntervalFrequency, Report, ReportsState, ReportTimeRange, SchedulingFrequency } from '../../types';

export const getTimezone = () => {
  // Older browser does not the internationalization API
  if (!(window as any).Intl) {
    return '';
  }

  const dateFormat = (window as any).Intl.DateTimeFormat();
  if (!dateFormat.resolvedOptions) {
    return '';
  }

  const options = dateFormat.resolvedOptions();
  if (!options.timeZone) {
    return '';
  }

  return options.timeZone;
};

export const defaultTimeRange: TimeRange = {
  from: dateTime(null),
  to: dateTime(null),
  raw: { from: '', to: '' },
};

const blankReport: Report = {
  id: 0,
  name: '',
  recipients: '',
  replyTo: '',
  message: 'Hi, \nPlease find attached a PDF status report. If you have any questions, feel free to contact me!\nBest,',
  dashboardId: undefined,
  dashboardName: '',
  schedule: {
    frequency: SchedulingFrequency.Weekly,
    dayOfMonth: '1',
    timeZone: getTimezone(),
    intervalFrequency: IntervalFrequency.Hours,
    intervalAmount: 2,
  },
  options: {
    orientation: 'landscape',
    layout: 'grid',
    timeRange: defaultTimeRange.raw as ReportTimeRange,
  },
  enableDashboardUrl: true,
  enableCsv: false,
};

export const initialState: ReportsState = {
  reports: [] as Report[],
  report: blankReport,
  hasFetchedList: false,
  hasFetchedSingle: false,
  searchQuery: '',
  reportCount: 0,
  isLoading: true,
  settings: {
    branding: {
      reportLogoUrl: '',
      emailLogoUrl: '',
      emailFooterMode: FooterMode.SentBy,
      emailFooterText: '',
      emailFooterLink: '',
    },
  },
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    reportsLoaded: (state: ReportsState, action: PayloadAction<Report[]>): ReportsState => ({
      ...state,
      reports: action.payload,
      reportCount: action.payload.length,
      hasFetchedList: true,
    }),
    reportLoaded: (state: ReportsState, action: PayloadAction<Report>): ReportsState => ({
      ...state,
      report: action.payload,
      hasFetchedSingle: true,
      isLoading: false,
    }),
    updateReportProp: (state: ReportsState, action: PayloadAction<Report>): ReportsState => ({
      ...state,
      report: action.payload,
    }),
    clearReportState: (state: ReportsState, action: PayloadAction<undefined>): ReportsState => ({
      ...state,
      report: blankReport,
    }),
    reportLoadingBegin: (state: ReportsState) => ({
      ...state,
      isLoading: true,
    }),
    reportLoadingEnd: (state: ReportsState) => ({
      ...state,
      isLoading: false,
    }),
  },
});

export const {
  clearReportState,
  reportLoaded,
  reportsLoaded,
  updateReportProp,
  reportLoadingBegin,
  reportLoadingEnd,
} = reportsSlice.actions;

export const reportsReducers = reportsSlice.reducer;

export default {
  reports: reportsReducers,
};
