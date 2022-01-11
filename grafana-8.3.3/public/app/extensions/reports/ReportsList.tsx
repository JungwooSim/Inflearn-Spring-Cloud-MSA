import React, { FC } from 'react';
import { css, cx } from '@emotion/css';
import { Button, CardContainer, DeleteButton, Tooltip, useStyles2, useTheme2 } from '@grafana/ui';
import { GrafanaTheme2 } from '@grafana/data';
import { contextSrv } from 'app/core/core';
import { AccessControlAction, Report, ReportState, SchedulingFrequency } from '../types';
import { getReportState, parseScheduleTime } from './utils';

interface Props {
  reports: Report[];
  deleteReport: (report: Report) => void;
  updateReport: (report: Report) => void;
  filter: string;
}

const filterReports = (reports: Report[], filter: string) => {
  const filterFields: Array<keyof Pick<Report, 'name' | 'dashboardName' | 'recipients'>> = [
    'name',
    'dashboardName',
    'recipients',
  ];

  return reports.filter((report) => {
    return filterFields.some((field) => report[field].toLowerCase().includes(filter.toLowerCase()));
  });
};

const getReportStateColors = (theme: GrafanaTheme2) => {
  return new Map([
    [ReportState.Scheduled, theme.colors.success.text],
    [ReportState.Expired, theme.colors.warning.text],
    [ReportState.Draft, theme.colors.text.secondary],
    [ReportState.Never, theme.colors.text.secondary],
    [ReportState.Paused, theme.colors.text.disabled],
  ]);
};

export const ReportList: FC<Props> = ({ deleteReport, updateReport, reports, filter }) => {
  const theme = useTheme2();
  const styles = useStyles2(getStyles);

  const toggleReportState = (report: Report) => {
    const state = getReportState(report);
    let newState;

    if ([ReportState.Draft, ReportState.Expired].includes(state)) {
      newState = state;
    } else if (state !== ReportState.Paused) {
      newState = ReportState.Paused;
    } else {
      newState = ReportState.Scheduled;
    }

    updateReport({
      ...report,
      state: newState,
    });
  };

  const canEditReport = contextSrv.hasPermission(AccessControlAction.ReportingAdminWrite);
  const canDeleteReport = contextSrv.hasPermission(AccessControlAction.ReportingDelete);

  return (
    <div>
      {filterReports(reports, filter).map((report) => {
        const splitRecipients = report.recipients.split(';');
        const numRecipients = splitRecipients.length;
        const scheduleTime = parseScheduleTime(report.schedule);
        const reportState = getReportState(report);
        const isNever = report.schedule.frequency === SchedulingFrequency.Never;
        const showPlay = isNever || [ReportState.Draft, ReportState.Expired, ReportState.Paused].includes(reportState);
        const color = getReportStateColors(theme).get(reportState);
        return (
          <CardContainer key={report.id} href={`reports/edit/${report.id}`} className={styles.container}>
            <div className={styles.info}>
              <span className={styles.title}>{report.name}</span>
              <span>{report.dashboardName}</span>
            </div>
            <div className={styles.recipients}>
              <Tooltip content={splitRecipients.join(', ')} placement={'top'}>
                <div>{`${numRecipients} recipient${numRecipients > 1 ? 's' : ''}`}</div>
              </Tooltip>
            </div>
            <div className={styles.schedule}>
              <span
                className={cx(
                  styles.scheduleStatus,
                  css`
                    color: ${color};
                  `
                )}
              >
                {reportState.toUpperCase()}
              </span>
              {!isNever && <span className={getTextColor(theme, reportState)}>{scheduleTime}</span>}
            </div>
            <div className={styles.buttonWrapper}>
              <Tooltip content={`${showPlay ? 'Resume' : 'Pause'} report`} placement={'top'}>
                <Button
                  variant={'secondary'}
                  icon={showPlay ? 'play' : 'pause'}
                  size={'sm'}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleReportState(report);
                  }}
                  disabled={isNever || !canEditReport || [ReportState.Draft, ReportState.Expired].includes(reportState)}
                />
              </Tooltip>
              <DeleteButton size="sm" onConfirm={() => deleteReport(report)} disabled={!canDeleteReport} />
            </div>
          </CardContainer>
        );
      })}
    </div>
  );
};

const getTextColor = (theme: GrafanaTheme2, reportState: ReportState) => {
  return css`
    color: ${[ReportState.Scheduled, ReportState.Draft].includes(reportState)
      ? theme.colors.text.primary
      : theme.colors.text.secondary};
  `;
};
const getStyles = (theme: GrafanaTheme2) => {
  return {
    container: css({
      '& > a': {
        alignItems: 'center',
      },
    }),
    info: css({
      display: 'flex',
      flexDirection: 'column',
      width: '30%',
    }),
    title: css({
      fontSize: theme.typography.h5.fontSize,
      fontWeight: theme.typography.fontWeightBold,
    }),
    recipients: css({
      display: 'flex',
      width: '25%',
      cursor: 'pointer',

      '&:hover': {
        textDecoration: 'underline',
      },
    }),
    schedule: css({
      display: 'flex',
      flexDirection: 'column',
      width: '40%',
    }),
    scheduleStatus: css({
      textTransform: 'uppercase',
    }),
    buttonWrapper: css({
      display: 'flex',
      alignItems: 'center',
      width: '5%',
      '& > button': {
        marginRight: theme.spacing(2),

        '&[disabled]': {
          pointerEvents: 'all',
        },
      },
    }),
  };
};
