import React from 'react';
import { createTheme } from '@grafana/data';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReportPage, Props } from './ReportPage';
import { initialState, updateReportProp, clearReportState } from './state/reducers';
import { mockToolkitActionCreator, mockToolkitActionCreatorWithoutPayload } from '../../../test/core/redux/mocks';
import { SchedulingFrequency, ReportOrientation, ReportLayout } from '../types';
import { getRouteComponentProps } from 'app/core/navigation/__mocks__/routeProps';
import { selectOptionInTest } from '@grafana/ui';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('app/core/services/backend_srv', () => {
  return {
    backendSrv: {
      search: async () => Promise.resolve([{ id: 1, uid: 'test', value: 1, title: 'test db' }]),
    },
  };
});

jest.mock('app/core/config', () => {
  return {
    ...(jest.requireActual('app/core/config') as any),
    buildInfo: {},
    licenseInfo: {},
    rendererAvailable: true,
  };
});

jest.mock('app/core/core', () => {
  return {
    contextSrv: {
      hasPermission: () => true,
    },
  };
});

const blankReport = initialState.report;
const testReport = {
  ...blankReport,
  id: 1,
  name: 'Test report',
  dashboardId: 1,
  dashboardName: 'Test dashboard',
  recipients: 'test@me.com',
};

const report = {
  id: 20,
  userId: 1,
  orgId: 1,
  dashboardId: 37,
  dashboardName: 'Datasource tests - Elasticsearch comparison',
  name: 'Test Report',
  recipients: 'me@test.com',
  replyTo: '',
  message: 'Hi, \nPlease find attached a PDF status report. If you have any questions, feel free to contact me!\nBest,',
  schedule: {
    frequency: SchedulingFrequency.Weekly,
    timeZone: 'Europe/Helsinki',
  },
  options: {
    landscape: true,
    timeRange: { from: '', to: '' },
    orientation: 'portrait' as ReportOrientation,
    layout: 'simple' as ReportLayout,
    branding: {
      reportLogoUrl: '',
      emailLogoUrl: '',
      emailFooterMode: 'sent-by',
      emailFooterText: '',
      emailFooterLink: '',
    },
  },
};

const setup = (propOverrides?: Partial<Props>) => {
  const props: Props = {
    ...getRouteComponentProps(),
    report: blankReport,
    reportId: 0,
    isLoading: false,
    theme: createTheme(),
    variables: [],

    createReport: jest.fn(),
    updateReport: jest.fn(),
    loadReport: jest.fn(),
    sendTestEmail: jest.fn(),
    clearReportState: mockToolkitActionCreatorWithoutPayload(clearReportState),
    updateReportProp: mockToolkitActionCreator(updateReportProp),
    initVariables: jest.fn(),
    cleanUpVariables: jest.fn(),
  };

  Object.assign(props, propOverrides);

  render(<ReportPage {...props} />);
};

const mockCreate = jest.fn();

describe('ReportPage', () => {
  it('should render New report page when reportId is undefined', async () => {
    setup();
    const header = await screen.findByText('New report');

    expect(header).toBeInTheDocument();
  });

  it("should trigger 'create' prop on save when New report page is rendered ", async () => {
    setup({ createReport: mockCreate, report: testReport });

    fireEvent.submit(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => expect(mockCreate).toHaveBeenCalledTimes(1));
  });

  it('should render Edit [reportName] page when reportId is present', async () => {
    const mockLoad = jest.fn();
    setup({ loadReport: mockLoad, report: { ...testReport, id: 1 }, reportId: 1 });
    expect(await screen.findByText('Edit Test report')).toBeInTheDocument();

    // Should also call loadReport on mount
    expect(mockLoad).toHaveBeenCalledTimes(1);
  });

  it("should trigger 'update' prop on save when New report page is rendered ", async () => {
    const mockUpdate = jest.fn();
    setup({ updateReport: mockUpdate, report: { ...testReport, id: 1 }, reportId: 1 });
    fireEvent.submit(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(mockUpdate).toHaveBeenCalledTimes(1));
  });

  it('should validate the form on submit', async () => {
    setup({ createReport: mockCreate });

    fireEvent.submit(screen.getByText('Save'));

    expect(await screen.findAllByRole('alert')).toHaveLength(3);
    expect(mockCreate).not.toBeCalled();

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Dashboard is required')).toBeInTheDocument();
    expect(screen.getByText('Recipients are required')).toBeInTheDocument();
  });

  it('should correctly set the form values for Edit page', async () => {
    setup({ report, reportId: report.id });

    await waitFor(() => screen.getByDisplayValue('Test Report'));

    // In this case 'name' option is an accessible name: https://act-rules.github.io/rules/e086e5#accessible-name,
    // e.i. input's label, not the 'name' attribute. For this to work id prop needs to be passed to the input
    expect(screen.getByRole('textbox', { name: /report name/i })).toHaveAttribute('value', report.name);
    expect(screen.getByText(report.recipients)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /reply-to/i })).toHaveAttribute('value', report.replyTo);
    expect((screen.getByRole('textbox', { name: /message/i }) as HTMLTextAreaElement).value).toBe(report.message);
    expect(screen.getByText(report.dashboardName)).toBeInTheDocument();
    expect(screen.getByText('Select time range')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /weekly/i })).toBeChecked();
    expect(screen.getByText(/europe\/helsinki/i)).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /portrait/i })).toBeChecked();
    expect(screen.getByRole('radio', { name: /simple/i })).toBeChecked();
  });

  it('should validate recipients', async () => {
    setup({ createReport: mockCreate });
    fireEvent.input(await screen.findByRole('textbox', { name: /report name/i }), { target: { value: 'Test report' } });
    await userEvent.type(screen.getByPlaceholderText(/Type in the recipients/), 'textme.com');
    await userEvent.type(screen.getByPlaceholderText(/Type in the recipients/), '{enter}');

    fireEvent.submit(screen.getByRole('button', { name: 'Save' }));
    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(mockCreate).not.toBeCalled();
    expect((screen.getByRole('textbox', { name: /report name/i }) as HTMLInputElement).value).toBe('Test report');
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    expect(screen.getByText(/dashboard is required/i)).toBeInTheDocument();
  });

  it('should have "Preview PDF" and "Send Test Email" buttons disabled until the required fields are provided', async () => {
    setup();
    await screen.findByText('New report');
    expect(screen.getByText(/preview pdf/i).closest('a')).not.toHaveAttribute('href');
    expect(screen.getByRole('button', { name: /send test email/i })).toBeDisabled();

    await act(async () => {
      await userEvent.type(screen.getByRole('textbox', { name: /report name/i }), 'Test report');
      await userEvent.type(screen.getByPlaceholderText(/Type in the recipients/), 'test@example.com');
      await userEvent.type(screen.getByPlaceholderText(/Type in the recipients/), '{enter}');
      await selectOptionInTest(screen.getAllByText(/select dashboard/i)[1], /test db/i);
    });

    expect(screen.getByText(/preview pdf/i).closest('a')).toHaveAttribute('href');
    expect(screen.getByRole('button', { name: /send test email/i })).not.toBeDisabled();
  });

  it('should have "Preview PDF" and "Send Test Email" buttons enabled in edit view', async () => {
    setup({ report, reportId: report.id });

    await waitFor(() => screen.getByText(/preview pdf/i));

    expect(screen.getByText(/preview pdf/i).closest('a')).toHaveAttribute('href');
    expect(screen.getByRole('button', { name: /send test email/i })).not.toBeDisabled();

    await act(async () => {
      await userEvent.clear(screen.getByRole('textbox', { name: /report name/i }));
    });

    // Preview PDF button should still work if dashboard id is provided
    expect(screen.getByText(/preview pdf/i).closest('a')).toHaveAttribute('href');
    // Send Test Email button should be disabled if report name and recipients are missing
    expect(screen.getByRole('button', { name: /send test email/i })).toBeDisabled();
  });
});

describe('ReportScheduling', () => {
  const currentDate = new Date('2020-01-01T13:30:18.989Z');
  beforeAll(() => {
    // Lock current date time
    jest.spyOn(Date, 'now').mockImplementation(() => currentDate.valueOf());
  });

  it('should render scheduler with default values applied', async () => {
    setup();
    expect(await screen.findByText(/schedule and send/i)).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Weekly' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Send now' })).toBeChecked();
    expect(
      screen.getByText('The report will be sent immediately after it is saved and will be sent every week.')
    ).toBeInTheDocument();
    expect(screen.queryByLabelText(/report schedule start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/report schedule start date/i)).toHaveValue('');
    expect(screen.queryByText(/start time/i)).not.toBeInTheDocument();
    expect(screen.getByText(/time zone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/report schedule end date/i)).toHaveValue('');
    expect(screen.queryByText(/end time/i)).not.toBeInTheDocument();

    // Select "Send later"
    fireEvent.click(screen.getByRole('radio', { name: /later/ }));
    expect(screen.getByLabelText(/report schedule start date/i)).toHaveValue('01/01/2020');
    expect(screen.getByText(/start time/i)).toBeInTheDocument();
    expect(screen.getByText(/time zone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/report schedule end date/i)).toHaveValue('');
    expect(screen.queryByText(/end time/i)).not.toBeInTheDocument();
  });

  describe('Correct fields for each frequency are displayed when creating a report', () => {
    beforeEach(() => {
      setup();
    });

    const selectDate = (date: string, type = 'start') => {
      const re = type === 'start' ? /report schedule start date/i : /report schedule end date/i;
      fireEvent.click(screen.getByLabelText(re));
      fireEvent.click(screen.getByRole('button', { name: date }));
    };

    it('once', () => {
      fireEvent.click(screen.getByRole('radio', { name: /once/i }));
      expect(screen.getByRole('radio', { name: 'Send now' })).toBeChecked();
      expect(screen.queryByLabelText(/report schedule end date/i)).not.toBeInTheDocument();
      expect(screen.getByText('The report will be sent immediately after it is saved.')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('radio', { name: /later/i }));
      expect(screen.getByLabelText(/report schedule start date/i)).toHaveValue('01/01/2020');
      expect(screen.getByText(/start time/i)).toBeInTheDocument();
      expect(screen.getByText(/The report will be sent: Once on January 1, 2020/i)).toBeInTheDocument();
      expect(screen.queryByLabelText(/report schedule end date/i)).not.toBeInTheDocument();
    });

    it('hourly', () => {
      fireEvent.click(screen.getByRole('radio', { name: /hourly/i }));
      expect(screen.getByRole('radio', { name: 'Send now' })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: /only on workdays/i })).toBeInTheDocument();
      expect(
        screen.getByText('The report will be sent immediately after it is saved and will be sent every hour.')
      ).toBeInTheDocument();
      fireEvent.click(screen.getByRole('radio', { name: /later/i }));
      selectDate('January 1, 2020');
      expect(screen.getByLabelText(/report schedule start date/i)).toHaveValue('01/01/2020');
      expect(screen.getByText(/start time/i)).toBeInTheDocument();
      expect(screen.queryByText(/end time/i)).not.toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /only on workdays/i })).toBeInTheDocument();
      expect(screen.getByText(/The report will be sent: Hourly at minute 00/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/report schedule end date/i)).toHaveValue('');
      fireEvent.click(screen.getByLabelText(/report schedule end date/i));
      fireEvent.click(screen.getByRole('button', { name: 'January 11, 2020' }));
      expect(screen.getByLabelText(/report schedule end date/i)).toHaveValue('01/11/2020');
      expect(screen.getByText(/end time/i)).toBeInTheDocument();
      expect(
        screen.getByText(/The report will be sent: Hourly at minute 00, January 1, 2020 - January 11, 2020/i)
      ).toBeInTheDocument();
    });

    it('daily', () => {
      fireEvent.click(screen.getByRole('radio', { name: /daily/i }));
      expect(screen.getByRole('radio', { name: 'Send now' })).toBeChecked();
      fireEvent.click(screen.getByRole('radio', { name: /later/i }));
      expect(screen.queryByText(/end time/i)).not.toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /only on workdays/i })).toBeInTheDocument();
      selectDate('January 1, 2020');
      selectDate('January 11, 2020', 'end');
      expect(screen.getByText(/January 1, 2020 - January 11, 2020/i));
      fireEvent.click(screen.getByRole('radio', { name: /send now/i }));
      // start date and time fields are hidden, not removed from DOM
      expect(screen.queryByLabelText(/report schedule start date/i)).not.toBeVisible();
      expect(screen.queryByText(/start time/i)).not.toBeVisible();
      expect(screen.getByLabelText(/report schedule end date/i)).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /only on workdays/i })).toBeInTheDocument();
      expect(
        screen.getByText(/The report will be sent immediately after it is saved and will be sent every day./i)
      ).toBeInTheDocument();
    });
    it('weekly', () => {
      fireEvent.click(screen.getByRole('radio', { name: /weekly/i }));
      expect(screen.queryByLabelText(/report schedule start date/i)).not.toBeVisible();
      expect(screen.queryByText(/start time/i)).not.toBeInTheDocument();
      expect(screen.getByLabelText(/report schedule end date/i)).toBeInTheDocument();
      expect(screen.queryByRole('checkbox', { name: /only on workdays/i })).not.toBeInTheDocument();
      expect(
        screen.getByText(/The report will be sent immediately after it is saved and will be sent every week./i)
      ).toBeInTheDocument();
      fireEvent.click(screen.getByRole('radio', { name: /later/i }));
      selectDate('January 1, 2020');
      selectDate('January 11, 2020', 'end');
      expect(screen.getByLabelText(/report schedule start date/i)).toHaveValue('01/01/2020');
      expect(screen.getByText(/start time/i)).toBeVisible();
      expect(screen.queryByText(/end time/i)).not.toBeInTheDocument();
      expect(screen.getByText(/The report will be sent: Every Wednesday at 00:00/i));
    });
    it('monthly', () => {
      fireEvent.click(screen.getByRole('radio', { name: /monthly/i }));
      expect(screen.getByRole('radio', { name: 'Send now' })).toBeChecked();
      fireEvent.click(screen.getByRole('radio', { name: /later/i }));
      expect(screen.getByRole('checkbox', { name: /send on the last day of month/i })).toBeInTheDocument();
      selectDate('January 1, 2020');
      selectDate('January 11, 2020', 'end');
      expect(screen.getByLabelText(/report schedule start date/i)).toHaveValue('01/01/2020');
      expect(screen.getByText(/start time/i)).toBeVisible();
      expect(screen.getByLabelText(/report schedule end date/i)).toBeVisible();
      expect(screen.queryByText(/end time/i)).not.toBeInTheDocument();
      expect(
        screen.getByText(
          /The report will be sent: Monthly on 1st day at 00:00 UTC-05:00, January 1, 2020 - January 11, 2020./i
        )
      ).toBeInTheDocument();
      fireEvent.click(screen.getByRole('checkbox', { name: /send on the last day of month/i }));
      expect(screen.getByLabelText(/report schedule start date/i)).toHaveValue('01/31/2020');
      userEvent.clear(screen.getByLabelText(/report schedule end date/i));
      expect(screen.getByText(/The report will be sent: Monthly on the last day at 00:00./i)).toBeInTheDocument();
      fireEvent.click(screen.getByRole('radio', { name: /send now/i }));
      expect(screen.queryByRole('checkbox', { name: /send on the last day of month/i })).not.toBeInTheDocument();
      expect(screen.getByLabelText(/report schedule start date/i)).not.toBeVisible();
      expect(screen.getByText(/start time/i)).not.toBeVisible();
      expect(screen.getByLabelText(/report schedule end date/i)).toBeInTheDocument();
      expect(screen.queryByText(/end time/i)).not.toBeInTheDocument();
      expect(
        screen.getByText('The report will be sent immediately after it is saved and will be sent every month.')
      ).toBeInTheDocument();
    });

    it('custom', async () => {
      fireEvent.click(screen.getByRole('radio', { name: /custom/i }));
      expect(screen.getByRole('radio', { name: /send now/i })).toBeChecked();
      expect(screen.getByLabelText(/repeat every/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/custom frequency/i)).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /only on workdays/i })).toBeInTheDocument();
      expect(
        screen.getByText(/The report will be sent immediately after it is saved and will be sent every 2 hours./i)
      ).toBeInTheDocument();
      fireEvent.click(screen.getByRole('radio', { name: /later/i }));
      expect(screen.getByText(/The report will be sent: Every 2 hours./i)).toBeInTheDocument();
      expect(screen.queryByText(/end time/i)).not.toBeInTheDocument();
      expect(screen.getByLabelText(/report schedule end date/i)).toBeVisible();
      selectDate('January 1, 2020');
      selectDate('January 11, 2020', 'end');
      expect(screen.getByText(/end time/i)).toBeInTheDocument();
      await selectOptionInTest(screen.getByLabelText(/custom frequency/i), 'months');
      expect(screen.queryByText(/end time/i)).not.toBeInTheDocument();
      expect(
        screen.getByText(/The report will be sent: Every 2 months, January 1, 2020 - January 11, 2020./i)
      ).toBeInTheDocument();
    });

    it('never', () => {
      fireEvent.click(screen.getByRole('radio', { name: /never/i }));
      expect(screen.queryByRole('radio', { name: /send now/i })).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/report schedule start date/i)).not.toBeVisible();
      expect(screen.queryByText(/start time/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/end time/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/report schedule end date/i)).not.toBeInTheDocument();
    });
  });

  describe('Correct fields for each frequency are displayed when editing a report', () => {
    const schedule = {
      startDate: '2020-03-16T03:20:00+01:00',
      endDate: null,
      frequency: SchedulingFrequency.Daily,
      intervalFrequency: '',
      intervalAmount: 0,
      workdaysOnly: false,
      dayOfMonth: '16',
      timeZone: 'Africa/Niamey',
    } as any;

    it('once', () => {
      setup({ report: { ...testReport, schedule: { ...schedule, frequency: SchedulingFrequency.Once } } });
      expect(screen.getByRole('radio', { name: /once/i })).toBeChecked();
      expect(screen.getByRole('radio', { name: /later/i })).toBeChecked();
      expect(screen.getByLabelText(/report schedule start date/i)).toBeVisible();
      expect(screen.getByLabelText(/report schedule start date/i)).toHaveValue('03/16/2020');
      expect(screen.getByText('Africa/Niamey')).toBeInTheDocument();
      expect(screen.getByDisplayValue('03:20')).toBeInTheDocument();
      expect(screen.queryByLabelText(/report schedule end date/i)).not.toBeInTheDocument();
      expect(screen.queryByRole('checkbox', { name: /only on workdays/i })).not.toBeInTheDocument();
      expect(screen.getByText('The report will be sent: Once on March 16, 2020.')).toBeInTheDocument();
    });

    it('hourly', () => {
      setup({
        report: {
          ...testReport,
          schedule: {
            ...schedule,
            frequency: SchedulingFrequency.Hourly,
            endDate: '2020-04-16T06:40:00+01:00',
            workdaysOnly: true,
          },
        },
      });

      expect(screen.getByRole('radio', { name: /hourly/i })).toBeChecked();
      expect(screen.getByRole('radio', { name: /later/i })).toBeChecked();
      expect(screen.getByLabelText(/report schedule start date/i)).toBeVisible();
      expect(screen.getByLabelText(/report schedule start date/i)).toHaveValue('03/16/2020');
      expect(screen.getByText('Africa/Niamey')).toBeInTheDocument();
      expect(screen.getByDisplayValue('03:20')).toBeInTheDocument();
      expect(screen.getByLabelText(/report schedule end date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/report schedule end date/i)).toHaveValue('04/16/2020');
      expect(screen.getByDisplayValue('06:40')).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /only on workdays/i })).toBeChecked();
      expect(
        screen.getByText(
          /The report will be sent: Hourly at minute 20, March 16, 2020 - April 16, 2020, Monday to Friday/i
        )
      ).toBeInTheDocument();
    });

    it('daily', () => {
      setup({ report: { ...testReport, schedule } });
      expect(screen.getByRole('radio', { name: /daily/i })).toBeChecked();
      expect(screen.getByRole('radio', { name: /later/i })).toBeChecked();
      expect(screen.getByLabelText(/report schedule start date/i)).toBeVisible();
      expect(screen.getByLabelText(/report schedule start date/i)).toHaveValue('03/16/2020');
      expect(screen.getByText('Africa/Niamey')).toBeInTheDocument();
      expect(screen.getByDisplayValue('03:20')).toBeInTheDocument();
      expect(screen.getByLabelText(/report schedule end date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/report schedule end date/i)).toHaveValue('');
      expect(screen.getByRole('checkbox', { name: /only on workdays/i })).not.toBeChecked();
      expect(screen.getByText('The report will be sent: Daily at 03:20 UTC+01:00.')).toBeInTheDocument();
    });

    it('weekly', () => {
      setup({ report: { ...testReport, schedule: { ...schedule, frequency: SchedulingFrequency.Weekly } } });
      expect(screen.getByRole('radio', { name: /weekly/i })).toBeChecked();
      expect(screen.getByRole('radio', { name: /later/i })).toBeChecked();
      expect(screen.getByLabelText(/report schedule start date/i)).toBeVisible();
      expect(screen.getByLabelText(/report schedule start date/i)).toHaveValue('03/16/2020');
      expect(screen.getByText('Africa/Niamey')).toBeInTheDocument();
      expect(screen.getByDisplayValue('03:20')).toBeInTheDocument();
      expect(screen.getByLabelText(/report schedule end date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/report schedule end date/i)).toHaveValue('');
      expect(screen.queryByRole('checkbox', { name: /only on workdays/i })).not.toBeInTheDocument();
      expect(screen.getByText('The report will be sent: Every Monday at 03:20 UTC+01:00.')).toBeInTheDocument();
    });

    it('monthly', () => {
      setup({
        report: {
          ...testReport,
          schedule: { ...schedule, frequency: SchedulingFrequency.Monthly, dayOfMonth: 'last' },
        },
      });
      expect(screen.getByRole('radio', { name: /monthly/i })).toBeChecked();
      expect(screen.getByRole('radio', { name: /later/i })).toBeChecked();
      expect(screen.getByLabelText(/report schedule start date/i)).toBeVisible();
      expect(screen.getByLabelText(/report schedule start date/i)).toHaveValue('03/16/2020');
      expect(screen.getByText('Africa/Niamey')).toBeInTheDocument();
      expect(screen.getByDisplayValue('03:20')).toBeInTheDocument();
      expect(screen.getByLabelText(/report schedule end date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/report schedule end date/i)).toHaveValue('');
      expect(screen.queryByRole('checkbox', { name: /only on workdays/i })).not.toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /send on the last day of month/i })).toBeChecked();
      expect(
        screen.getByText('The report will be sent: Monthly on the last day at 03:20 UTC+01:00.')
      ).toBeInTheDocument();
    });

    it('custom (months)', () => {
      setup({
        report: {
          ...testReport,
          schedule: {
            ...schedule,
            frequency: SchedulingFrequency.Custom,
            intervalFrequency: 'months',
            intervalAmount: '3',
          },
        },
      });
      expect(screen.getByRole('radio', { name: /custom/i })).toBeChecked();
      expect(screen.getByRole('radio', { name: /later/i })).toBeChecked();
      expect(screen.getByLabelText(/report schedule start date/i)).toBeVisible();
      expect(screen.getByLabelText(/report schedule start date/i)).toHaveValue('03/16/2020');
      expect(screen.getByText('Africa/Niamey')).toBeInTheDocument();
      expect(screen.getByDisplayValue('03:20')).toBeInTheDocument();
      expect(screen.getByLabelText(/report schedule end date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/report schedule end date/i)).toHaveValue('');
      expect(screen.queryByRole('checkbox', { name: /only on workdays/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('checkbox', { name: /send on the last day of month/i })).not.toBeInTheDocument();
      expect(screen.getByText('The report will be sent: Every 3 months, from March 16, 2020.')).toBeInTheDocument();
    });

    it('custom (hours)', () => {
      setup({
        report: {
          ...testReport,
          schedule: {
            ...schedule,
            frequency: SchedulingFrequency.Custom,
            intervalFrequency: 'hours',
            intervalAmount: '3',
            workdaysOnly: true,
          },
        },
      });
      expect(screen.getByRole('radio', { name: /custom/i })).toBeChecked();
      expect(screen.getByRole('radio', { name: /later/i })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: /only on workdays/i })).toBeChecked();
      expect(screen.queryByRole('checkbox', { name: /send on the last day of month/i })).not.toBeInTheDocument();
      expect(
        screen.getByText('The report will be sent: Every 3 hours, from 03:20 UTC+01:00, Monday to Friday.')
      ).toBeInTheDocument();
    });

    it('never ', () => {
      setup({ report: { ...testReport, schedule: { ...schedule, frequency: SchedulingFrequency.Never } } });
      expect(screen.getByRole('radio', { name: /never/i })).toBeChecked();
      expect(screen.queryByRole('radio', { name: /later/i })).not.toBeInTheDocument();
      expect(screen.getByLabelText(/report schedule start date/i)).not.toBeVisible();
      expect(screen.getByText('Africa/Niamey')).not.toBeVisible();
      expect(screen.getByDisplayValue('03:20')).not.toBeVisible();
      expect(screen.queryByLabelText(/report schedule end date/i)).not.toBeInTheDocument();
      expect(screen.queryByRole('checkbox', { name: /only on workdays/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('checkbox', { name: /send on the last day of month/i })).not.toBeInTheDocument();
      expect(screen.getByText('The report will not be sent.')).toBeInTheDocument();
    });
  });

  it('should save correct schedule date for hourly schedule', async () => {
    setup({
      report: { ...testReport, schedule: { ...testReport.schedule, startDate: '2021-01-11', endDate: '2021-02-11' } },
      createReport: mockCreate,
    });
    expect(await screen.findByText(/schedule and send/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('radio', { name: 'Monthly' }));

    fireEvent.click(screen.getByLabelText(/report schedule start date/i));
    fireEvent.click(screen.getByRole('button', { name: 'January 11, 2021' }));
    expect(screen.getByLabelText(/report schedule start date/i)).toHaveValue('01/11/2021');

    // Open the time picker overlay
    fireEvent.click(screen.getByDisplayValue('00:00'));
    fireEvent.click(screen.getByRole('button', { name: '04' }));

    // Close the time picker overlay by clicking away
    await userEvent.click(screen.getByRole('radio', { name: 'Monthly' }));

    await selectOptionInTest(screen.getByLabelText('Time zone picker'), 'Europe/Rome');
    fireEvent.submit(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() =>
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          schedule: {
            frequency: 'monthly',
            startDate: '2021-01-11T04:00:00+01:00',
            endDate: '2021-02-11T00:00:00+01:00',
            timeZone: 'Europe/Rome',
          },
        })
      )
    );
  });

  it('should correctly handle custom schedule', async () => {
    setup({
      report: {
        ...testReport,
        schedule: { ...testReport.schedule, startDate: '2021-01-11', endDate: '2021-02-11' },
      },
      createReport: mockCreate,
    });
    expect(await screen.findByText(/schedule and send/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('radio', { name: 'Custom' }));
    await userEvent.clear(screen.getByLabelText(/repeat every/i));
    await userEvent.type(screen.getByLabelText(/repeat every/i), '5');

    fireEvent.click(screen.getByRole('checkbox', { name: /send only on workdays/i }));

    await selectOptionInTest(screen.getByLabelText('Time zone picker'), 'Europe/Helsinki');

    fireEvent.submit(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() =>
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          schedule: {
            frequency: 'custom',
            startDate: '2021-01-11T00:00:00+02:00',
            endDate: '2021-02-11T00:00:00+02:00',
            intervalAmount: 5,
            intervalFrequency: 'hours',
            timeZone: 'Europe/Helsinki',
            workdaysOnly: true,
          },
        })
      )
    );
  });
});
