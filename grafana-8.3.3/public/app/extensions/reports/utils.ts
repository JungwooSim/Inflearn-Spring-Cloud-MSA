import { dateTime, dateTimeFormat } from '@grafana/data';
import { formatUtcOffset } from '@grafana/ui/src/components/DateTimePickers/TimeZonePicker/TimeZoneOffset';
import config from 'app/core/config';
import { VariableModel } from 'app/features/variables/types';
import { hasOptions } from 'app/features/variables/guard';
import { variableAdapters } from 'app/features/variables/adapters';
import {
  IntervalFrequency,
  Report,
  ReportDTO,
  ReportState,
  SchedulingData,
  SchedulingFrequency,
  SchedulingOptions,
} from '../types';

type Time = {
  hour: number;
  minute: number;
};
/**
 * Process schedule data
 * @param scheduleData
 */
export const getSchedule = (scheduleData = {} as SchedulingData) => {
  const {
    time,
    startDate,
    endDate,
    endTime,
    timeZone,
    frequency,
    dayOfMonth,
    workdaysOnly,
    intervalFrequency,
    intervalAmount,
    sendTime,
  } = scheduleData;
  const parsedTime = !time && startDate ? getTime(String(startDate)) : time;
  const combinedStartDate = startDate && sendTime !== 'now' ? createDate(startDate, parsedTime as Time, timeZone) : '';
  const combinedEndDate =
    endDate && ![SchedulingFrequency.Once, SchedulingFrequency.Never].includes(frequency)
      ? createDate(endDate, (endTime as unknown) as Time, timeZone)
      : '';
  const options = {
    frequency,
    timeZone,
    workdaysOnly,
    intervalFrequency,
    intervalAmount: intervalAmount ? parseInt(intervalAmount, 10) : 0,
    startDate: combinedStartDate,
    endDate: combinedEndDate,
    dayOfMonth: dayOfMonth ? 'last' : '',
  };

  // Remove empty/falsy fields from the schedule object
  return (Object.fromEntries(Object.entries(options).filter(([_, val]) => val)) as unknown) as SchedulingOptions;
};

/**
 * Combine date, time and timezone into a single DateTime string and set the timezone to UTC
 * @param date
 * @param time
 * @param timeZone
 */
const createDate = (date: Date | string, time: Time = { hour: 0, minute: 0 }, timeZone?: string) => {
  const timeString = `${time.hour}:${time.minute}:00`;
  const formattedDate = typeof date === 'string' ? getDate(date) : date;
  const dateObj = new Date(`${dateTime(formattedDate).format('YYYY/MM/DD')} ${timeString}`);
  const offset = dateTimeFormat(dateObj.getTime(), {
    timeZone,
    format: 'Z',
  });

  return removeTimeZone(dateTime(dateObj).format()) + offset;
};

const removeTimeZone = (date: string) => {
  if (date.includes('Z')) {
    return date.replace('Z', '');
  }

  return date.slice(0, -6);
};

/**
 * Extract date part from datetime string
 * @param date
 */
export const getDate = (date?: string) => {
  if (!date) {
    return '';
  }
  return dateTime(date.split('T')[0]).toDate();
};

/**
 * Pad time with 0, if it has one digit
 */
export const padTime = (time: number | string) => {
  if (String(time).length === 1) {
    return `0${time}`;
  }

  return String(time);
};

/**
 * Extract time as {hour, minute} from datetime string
 * @param date
 */
export const getTime = (date?: string) => {
  if (!date) {
    return { hour: 0, minute: 0 };
  }
  const match = date.match(/T(\d+):(\d+)/);
  if (match) {
    const [, hour, minute] = match;
    return { hour, minute };
  }

  return { hour: 0, minute: 0 };
};

/**
 * Convert variable values to CSV and remove all empty keys before sending to backend
 * @param variables
 */
export const variablesToCsv = (variables?: VariableModel[]) => {
  if (!variables?.length) {
    return {};
  }

  return Object.fromEntries(
    variables.map((variable) => {
      const { getValueForUrl } = variableAdapters.get(variable.type);
      const value = getValueForUrl(variable);
      return [variable.name, Array.isArray(value) ? value.join(',') : value];
    })
  );
};

export const applyDefaultVariables = (variables: VariableModel[], reportVariables?: Report['templateVars']) => {
  if (!reportVariables || !Object.keys(reportVariables).length) {
    return variables;
  }

  return variables.map((variable) => {
    const reportVariable = reportVariables[variable.name];
    if (!reportVariable || !hasOptions(variable)) {
      return variable;
    }

    const split = reportVariable.split(',');
    const values = split
      .map((str) => variable.options.find((opt) => opt.value === str) || { text: str, value: str })
      .filter(Boolean);

    return {
      ...variable,
      current: { ...variable.current, text: values.map((val) => val?.text), value: values.map((val) => val?.value) },
      options: variable.options.map((option) => ({
        ...option,
        selected: typeof option.value === 'string' && split.includes(option.value),
      })),
    };
  });
};

// Get renderer version from its config field, return 1 by default
export const getRendererMajorVersion = (): number | null => {
  const version = config.rendererVersion;
  if (version === '') {
    return null;
  }

  const semverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
  const res = semverRegex.exec(version);

  let majorVersionStr = '';
  if (res && res.length > 1) {
    majorVersionStr = res[1];
  }

  if (majorVersionStr === '') {
    return 1;
  }

  let majorVersion = parseInt(majorVersionStr, 10);
  if (isNaN(majorVersion)) {
    majorVersion = 1;
  }

  return majorVersion;
};

export function getOrdinal(n: number) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const value = n % 100;
  return n + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
}

export const isHourFrequency = (frequency: SchedulingFrequency, interval = IntervalFrequency.Hours) => {
  return frequency === SchedulingFrequency.Custom && interval === IntervalFrequency.Hours;
};

export const showWorkdaysOnly = (frequency: SchedulingFrequency, interval = IntervalFrequency.Hours) => {
  return (
    [SchedulingFrequency.Hourly, SchedulingFrequency.Daily].includes(frequency) || isHourFrequency(frequency, interval)
  );
};

export function parseScheduleTime({
  startDate,
  endDate,
  intervalFrequency = IntervalFrequency.Hours,
  intervalAmount = 2,
  frequency,
  dayOfMonth,
  timeZone,
  workdaysOnly,
}: SchedulingOptions) {
  if (!startDate) {
    return '';
  }

  const locale = 'en-US';
  const { hour: h, minute: m } = getTime(startDate);
  const minute = padTime(m);
  const hour = padTime(h);
  const day = dateTime(getDate(startDate)).locale(locale).format('dddd');
  const date = dayOfMonth === 'last' ? `the last` : getOrdinal((getDate(startDate) as Date).getDate());
  let duration, time;
  const offset = formatUtcOffset(Date.now(), timeZone);
  const timeString = `at ${hour}:${minute}${offset ? ` ${offset}` : ''}`;
  const workdaysOnlyStr = workdaysOnly && showWorkdaysOnly(frequency, intervalFrequency) ? ', Monday to Friday' : '';
  if (endDate) {
    duration = `${dateTime(getDate(startDate)).locale(locale).format('LL')} - ${dateTime(getDate(endDate))
      .locale(locale)
      .format('LL')}`;
  }

  switch (frequency) {
    case SchedulingFrequency.Monthly:
      time = `Monthly on ${date} day ${timeString}`;
      break;
    case SchedulingFrequency.Weekly:
      time = `Every ${day} ${timeString}`;
      break;
    case SchedulingFrequency.Daily:
      time = `Daily ${timeString}`;
      break;
    case SchedulingFrequency.Hourly:
      time = `Hourly at minute ${minute}`;
      break;
    case SchedulingFrequency.Custom:
      time = `Every ${intervalAmount} ${intervalFrequency}`;
      break;
    case SchedulingFrequency.Once:
      time = `Once on ${dateTime(getDate(startDate)).locale(locale).format('LL')}`;
      break;
    case SchedulingFrequency.Never:
      time = `Never`;
      break;
  }

  if (duration && time) {
    return `${time}, ${duration}${workdaysOnlyStr}`;
  } else if (frequency === SchedulingFrequency.Custom) {
    time += `, ${
      intervalFrequency === IntervalFrequency.Hours
        ? `from ${hour}:${minute}${offset ? ` ${offset}` : ''}`
        : `from ${dateTime(getDate(startDate)).locale(locale).format('LL')}`
    }`;
  }

  return time + workdaysOnlyStr;
}

/**
 * Check if date is in the past
 * @param date
 */
const isPast = (date?: string) => {
  if (!date) {
    return false;
  }

  return dateTime(date).isBefore(dateTime());
};

export const getReportState = (report: ReportDTO) => {
  const { endDate, startDate, frequency } = report.schedule;

  if (frequency === SchedulingFrequency.Never) {
    return ReportState.Never;
  }
  if (isPast(endDate) || (frequency === SchedulingFrequency.Once && isPast(startDate))) {
    return ReportState.Expired;
  }

  return report.state || ReportState.Scheduled;
};

const recurrenceMap = new Map([
  [SchedulingFrequency.Monthly, 'month'],
  [SchedulingFrequency.Daily, 'day'],
  [SchedulingFrequency.Weekly, 'week'],
  [SchedulingFrequency.Hourly, 'hour'],
]);

export const schedulePreview = (schedule: SchedulingData) => {
  const { frequency, intervalFrequency, intervalAmount } = schedule;
  if (frequency === SchedulingFrequency.Never) {
    return 'The report will not be sent.';
  }

  const workdaysOnly = schedule.workdaysOnly ? ', Monday to Friday.' : '.';
  if (!schedule.sendTime || schedule.sendTime === 'now') {
    let preview = `The report will be sent immediately after it is saved`;
    let recurrence;
    if (recurrenceMap.has(frequency)) {
      recurrence = recurrenceMap.get(frequency);
    } else if (frequency === SchedulingFrequency.Custom) {
      recurrence = `${intervalAmount}  ${intervalFrequency}`;
    }
    if (recurrence) {
      preview += ` and will be sent every ${recurrence}`;
    }

    return `${preview}${workdaysOnly}`;
  }
  const preview = parseScheduleTime(getSchedule(schedule));

  if (preview) {
    return `The report will be sent: ${preview}.`;
  }

  return '';
};

export const collectVariables = () => {
  const variablePrefix = 'var-';
  const urlParams = new URLSearchParams(window.location.search);
  const variables: Record<string, string[]> = {};
  // We're missing dom.iterable libs for TS. This needs to be fixed on the OSS side
  // @ts-expect-error
  for (const [key, value] of urlParams.entries()) {
    if (key.startsWith(variablePrefix)) {
      const newKey = key.replace(variablePrefix, '');
      variables[newKey] = [...(variables[newKey] || []), value];
    }
  }

  return Object.fromEntries(Object.entries(variables).map(([key, value]) => [key, value.join(',')]));
};
