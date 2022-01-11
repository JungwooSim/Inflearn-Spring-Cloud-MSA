import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { css } from '@emotion/css';
import { AppEvents, GrafanaTheme2, SelectableValue, TimeRange, urlUtil } from '@grafana/data';
import {
  Button,
  Checkbox,
  Field,
  FieldSet,
  Form,
  HorizontalGroup,
  InlineField,
  Input,
  InputControl,
  Legend,
  LinkButton,
  ModalsController,
  stylesFactory,
  TagsInput,
  TextArea,
  Themeable2,
  TimeRangeInput,
  withTheme2,
} from '@grafana/ui';
import { DashboardPickerByID, DashboardPickerItem } from 'app/core/components/editors/DashboardPickerByID';
import { getVariables } from 'app/features/variables/state/selectors';
import { VariableHide, VariableModel } from 'app/features/variables/types';
import { variableAdapters } from 'app/features/variables/adapters';
import { cleanUpVariables } from 'app/features/variables/state/actions';
import { hasOptions } from 'app/features/variables/guard';
import {
  AccessControlAction,
  EnterpriseStoreState,
  Report,
  ReportDTO,
  ReportFormData,
  ReportOptions,
  ReportState,
} from '../types';
import { isExpired } from '../utils';
import { getRange, parseRange } from '../utils/time';
import { emailSeparator, isEmail, validateMultipleEmails } from '../utils/validators';
import { createReport, initVariables, loadReport, sendTestEmail, updateReport } from './state/actions';
import { collectVariables, getRendererMajorVersion, getSchedule, variablesToCsv } from './utils';
import { clearReportState, updateReportProp } from './state/reducers';
import { ReportScheduling } from './ReportScheduling';
import { ReportOptionsPicker } from './ReportOptionsPicker';
import { SendTestEmailModal } from './SendTestEmailModal';
import { GrafanaRouteComponentProps } from 'app/core/navigation/types';
import { ReportPageContainer } from './ReportPageContainer';
import { appEvents, contextSrv } from 'app/core/core';

interface OwnProps extends Themeable2, GrafanaRouteComponentProps<{ id: string }> {}

const mapStateToProps = (state: EnterpriseStoreState, props: OwnProps) => {
  const reportId = parseInt(props.match.params.id, 10);
  return {
    report: state.reports.report,
    isLoading: state.reports.isLoading,
    reportId,
    variables: getVariables(state),
  };
};

const mapActionsToProps = {
  updateReport,
  loadReport,
  createReport,
  clearReportState,
  updateReportProp,
  sendTestEmail,
  initVariables,
  cleanUpVariables,
};

const getUrlValues = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    timeRange: {
      to: urlParams.get('to') || '',
      from: urlParams.get('from') || '',
    },
    dashboard: {
      uid: urlParams.get('db-uid'),
      id: urlParams.get('db-id'),
      name: urlParams.get('db-name'),
    },
    variables: collectVariables(),
  };
};

const connector = connect(mapStateToProps, mapActionsToProps);
export type Props = ConnectedProps<typeof connector> & OwnProps;

export class ReportPage extends PureComponent<Props> {
  componentDidMount() {
    const { loadReport, reportId } = this.props;
    if (reportId) {
      loadReport(reportId);
    } else {
      // If new report is created, apply the values from URL params for variables
      const { dashboard, variables } = getUrlValues();
      if (variables && dashboard.uid) {
        this.props.initVariables(dashboard.uid, variables);
      }

      // Apply default time range
      this.props.updateReportProp(this.applyUrlValues(this.props.report));
    }
  }

  componentWillUnmount() {
    this.props.clearReportState();
    this.props.cleanUpVariables();
  }

  onDashboardChange = (dashboard?: DashboardPickerItem) => {
    const { initVariables, report: reportProp } = this.props;
    if (dashboard?.uid) {
      const defaultVars = dashboard.id === reportProp.dashboardId ? reportProp.templateVars : undefined;
      initVariables(dashboard.uid, defaultVars);
    }
  };

  onOptionsChange = (options: Pick<ReportOptions, 'orientation' | 'layout'>) => {
    const { report, updateReportProp } = this.props;
    updateReportProp({
      ...report,
      options: { ...report.options, ...options },
    });
  };

  onTimeRangeChange = (timeRange: TimeRange) => {
    const { report, updateReportProp } = this.props;
    updateReportProp({
      ...report,
      options: { ...report.options, timeRange: parseRange(timeRange.raw) },
    });
  };

  /**
   * Apply values from URL params as form's default, in case a report is created
   * from dashboard
   * @param report
   */
  applyUrlValues = (report: Report) => {
    // Do not apply URL values for edited report
    if (report.id) {
      return report;
    }
    const { timeRange, dashboard, variables } = getUrlValues();

    if (timeRange?.from && timeRange?.to) {
      report = {
        ...report,
        options: {
          ...report.options,
          timeRange,
        },
      };
    }

    if (dashboard.name && dashboard.id && dashboard.uid) {
      report = {
        ...report,
        dashboardName: dashboard.name,
        dashboardId: Number(dashboard.id),
        dashboardUid: dashboard.uid,
      };
    }

    if (variables && Object.keys(variables).length) {
      report.templateVars = variables;
    }
    return report;
  };

  /**
   * Get the report data before sending to the api
   * @param formData
   */
  getReportData(formData: ReportFormData): ReportDTO {
    const { report, variables } = this.props;
    const { options } = report;
    const { name, replyTo, recipients, message, dashboard, enableDashboardUrl, enableCsv } = formData;
    const schedule = getSchedule(formData.schedule);
    const state = formData.schedule.sendTime === 'now' ? ReportState.Scheduled : report.state;
    return {
      name,
      recipients,
      dashboardUid: dashboard.uid,
      dashboardId: dashboard.id,
      replyTo,
      message,
      schedule,
      options,
      templateVars: variablesToCsv(variables),
      enableDashboardUrl,
      enableCsv,
      state,
    };
  }

  submitForm = (formData: ReportFormData) => {
    const { createReport, updateReport, reportId } = this.props;
    const createOrUpdate = reportId ? updateReport : createReport;
    const reportData = this.getReportData(formData);
    const reportDto: ReportDTO = {
      id: reportId,
      ...reportData,
    };

    createOrUpdate(reportDto);
  };

  sendTestEmail = (formData: ReportFormData) => (email: string, useEmailsFromReport: boolean) => {
    const reportData = this.getReportData(formData);
    const recipients = useEmailsFromReport ? reportData.recipients : email;

    return sendTestEmail({ ...reportData, recipients });
  };

  getPreviewUrl(dashboardId: ReportFormData['dashboardId']) {
    const { report, variables } = this.props;
    const { name, options } = report;

    if (!dashboardId) {
      return undefined;
    }

    const { from, to } = getRange(options.timeRange).raw;

    const params: any = {
      title: name,
      from: from.valueOf(),
      to: to.valueOf(),
    };

    if (options.orientation) {
      params.orientation = options.orientation;
    }

    if (options.layout) {
      params.layout = options.layout;
    }

    if (variables?.length) {
      params.variables = JSON.stringify(variablesToCsv(variables));
    }

    return urlUtil.appendQueryToUrl(`api/reports/render/pdf/${dashboardId}`, urlUtil.toUrlParams(params));
  }

  render() {
    const { report, reportId, isLoading, theme, variables: propVariables } = this.props;
    const { message, name, recipients, replyTo, schedule, enableDashboardUrl, enableCsv, options } = report;
    const { dashboardId, dashboardName, dashboardUid } = this.applyUrlValues(report);
    const timeRange = getRange(options.timeRange);
    const heading = reportId ? `Edit ${name}` : 'New report';
    const dashboardSelected = (dashboardId ?? 0) > 0;
    const currentDashboard = dashboardSelected
      ? { value: dashboardId, id: dashboardId, uid: dashboardUid, label: dashboardName }
      : undefined;
    const styles = getStyles(theme);
    const variables = propVariables.filter((variable) => variable.hide !== VariableHide.hideVariable);

    const canEditReport =
      contextSrv.hasPermission(AccessControlAction.ReportingAdminWrite) ||
      contextSrv.hasPermission(AccessControlAction.ReportingAdminCreate);
    const canSendEmail = contextSrv.hasPermission(AccessControlAction.ReportingSend);
    const rendererMajorVersion = getRendererMajorVersion();

    return (
      <ReportPageContainer isLoading={Boolean(reportId && isLoading)} reportId={reportId}>
        <Legend className={styles.header}>{heading}</Legend>
        <Form onSubmit={this.submitForm} validateOn="onBlur" className={styles.form}>
          {({ register, errors, control, getValues, watch, setError, clearErrors, setValue }) => {
            //@ts-ignore
            const watchDashboard = watch('dashboard', currentDashboard) as SelectableValue;
            const watchName = watch('name', name);
            const watchRecipients = watch('recipients', recipients);
            const disabled = isExpired() || !watchDashboard?.id;
            const sendEmailDisabled = !canSendEmail || disabled || !watchName || !watchRecipients;

            return (
              <>
                <FieldSet label={'Create email'}>
                  <Field
                    className={styles.field}
                    label="Report name"
                    required
                    invalid={!!errors.name}
                    error="Name is required"
                    disabled={!canEditReport}
                  >
                    <Input
                      {...register('name', { required: true })}
                      type="text"
                      id="name"
                      defaultValue={name}
                      placeholder="System status report"
                    />
                  </Field>
                  <Field
                    className={styles.field}
                    label="Recipients"
                    required
                    invalid={!!errors.recipients}
                    error={errors.recipients?.message}
                    description={'Separate multiple emails with a comma or semicolon.'}
                  >
                    <InputControl
                      name="recipients"
                      control={control}
                      defaultValue={recipients}
                      render={({ field: { ref, value, onChange, ...field } }) => {
                        return (
                          <TagsInput
                            {...field}
                            disabled={!canEditReport}
                            invalid={!!errors.recipients}
                            onChange={(tags) => {
                              const splitTags = tags
                                .join(';')
                                .split(emailSeparator)
                                .filter(Boolean)
                                .map((tag) => tag.trim());
                              const invalidEmails = splitTags.filter((tag) => !isEmail(tag));
                              if (invalidEmails.length) {
                                setError('recipients', {
                                  type: 'manual',
                                  message: `Invalid email${invalidEmails.length > 1 ? 's' : ''}: ${invalidEmails.join(
                                    '; '
                                  )}`,
                                });
                              } else {
                                clearErrors('recipients');
                              }
                              onChange(splitTags.filter((tag) => isEmail(tag)).join(';'));
                            }}
                            placeholder={'Type in the recipients email addresses and press Enter'}
                            tags={value ? value.split(emailSeparator) : []}
                            className={styles.tagsInput}
                            addOnBlur
                          />
                        );
                      }}
                      rules={{
                        required: 'Recipients are required',
                        validate: (val) => {
                          return validateMultipleEmails(val) || 'Invalid email';
                        },
                      }}
                    />
                  </Field>
                  <Field className={styles.field} label="Reply-to email address" disabled={!canEditReport}>
                    <Input
                      {...register('replyTo')}
                      id="replyTo"
                      placeholder="your.address@company.com - optional"
                      type="email"
                      defaultValue={replyTo}
                    />
                  </Field>
                  <Field className={styles.field} label="Message" disabled={!canEditReport}>
                    <TextArea
                      {...register('message')}
                      id="message"
                      placeholder={message}
                      rows={10}
                      defaultValue={message}
                    />
                  </Field>
                  <Field className={styles.field} disabled={!canEditReport}>
                    <Checkbox
                      {...register('enableDashboardUrl')}
                      defaultChecked={enableDashboardUrl}
                      label="Include a dashboard link"
                    />
                  </Field>
                </FieldSet>
                <FieldSet label={'Select dashboard'}>
                  <Field
                    className={styles.field}
                    label="Source dashboard"
                    required
                    invalid={!!errors.dashboard}
                    error="Dashboard is required"
                  >
                    <InputControl
                      name="dashboard"
                      control={control}
                      render={({ field: { onChange, ref, ...field } }) => {
                        return (
                          <DashboardPickerByID
                            {...field}
                            isClearable
                            disabled={!canEditReport}
                            onChange={(dashboard) => {
                              this.onDashboardChange(dashboard);
                              onChange(dashboard);
                            }}
                          />
                        );
                      }}
                      defaultValue={currentDashboard}
                      rules={{ required: true }}
                    />
                  </Field>
                  {watchDashboard?.id !== undefined && Boolean(variables.length) && (
                    <Field className={styles.field} label={'Template variables'}>
                      <>
                        {variables.map((variable) => {
                          const { picker: Picker, setValue } = variableAdapters.get(variable.type);
                          return (
                            <InlineField
                              label={variable.name}
                              key={variable.name}
                              labelWidth={16}
                              disabled={!canEditReport}
                            >
                              <Picker
                                onVariableChange={(updated: VariableModel) => {
                                  if (hasOptions(updated)) {
                                    setValue(updated, updated.current);
                                  }
                                }}
                                variable={variable}
                              />
                            </InlineField>
                          );
                        })}
                      </>
                    </Field>
                  )}
                  <Field
                    className={styles.field}
                    label="Time range"
                    description="Generate report with the data from specified time range. If custom time range is empty the time range from the report's dashboard is used."
                    disabled={!canEditReport}
                  >
                    <TimeRangeInput value={timeRange} onChange={this.onTimeRangeChange} clearable />
                  </Field>
                </FieldSet>
                <FieldSet label={'Style report'} disabled={!canEditReport}>
                  <ReportOptionsPicker
                    options={options}
                    onChange={this.onOptionsChange}
                    fieldClassName={styles.field}
                  />

                  <Field className={styles.field} disabled={!canEditReport}>
                    <Checkbox
                      {...register('enableCsv')}
                      defaultChecked={enableCsv}
                      label="Add a CSV file of table panel data"
                      onChange={(event: React.FormEvent<HTMLInputElement>) => {
                        const enabled = event.currentTarget.checked;
                        if (enabled && rendererMajorVersion !== null && rendererMajorVersion < 3) {
                          appEvents.emit(AppEvents.alertError, [
                            'To export CSV files, you must update the Grafana Image Renderer plugin.',
                          ]);
                        }
                      }}
                    />
                  </Field>
                  <Field className={styles.field}>
                    <LinkButton
                      icon={'external-link-alt'}
                      href={this.getPreviewUrl(watchDashboard?.id)}
                      size="xs"
                      target="_blank"
                      rel="noreferrer noopener"
                      variant="secondary"
                      disabled={disabled}
                    >
                      Preview PDF
                    </LinkButton>
                  </Field>
                </FieldSet>
                <ReportScheduling
                  control={control}
                  watch={watch}
                  register={register}
                  setValue={setValue}
                  schedulingOptions={schedule}
                  disabled={!canEditReport}
                  fieldClassName={styles.field}
                />

                <HorizontalGroup spacing="md">
                  <Button type="submit" size="md" variant="primary" disabled={!canEditReport}>
                    Save
                  </Button>

                  <ModalsController>
                    {({ showModal, hideModal }) => (
                      <Button
                        disabled={sendEmailDisabled}
                        size="xs"
                        variant="secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          showModal(SendTestEmailModal, {
                            onDismiss: hideModal,
                            onSendTestEmail: this.sendTestEmail(getValues()),
                            emails: getValues().recipients,
                          });
                        }}
                      >
                        Send test email
                      </Button>
                    )}
                  </ModalsController>
                </HorizontalGroup>
              </>
            );
          }}
        </Form>
      </ReportPageContainer>
    );
  }
}

const getStyles = stylesFactory((theme: GrafanaTheme2) => {
  return {
    header: css`
      font-size: ${theme.typography.h2.fontSize};
    `,
    form: css`
      width: 100%;
      max-width: 650px;
      legend {
        margin-bottom: ${theme.spacing(3)};
      }
      & > fieldset {
        margin: ${theme.spacing(5)} auto 0 auto;

        &:last-of-type {
          margin-bottom: ${theme.spacing(5)};
        }
      }
    `,
    field: css`
      &:not(:last-of-type) {
        margin-bottom: ${theme.spacing(3)};
      }
    `,
    tagsInput: css`
      & > div:first-of-type {
        margin-bottom: ${theme.spacing(1)};
        div {
          background-color: ${theme.colors.background.secondary};
          border-color: ${theme.components.input.borderColor};
          color: ${theme.colors.text.primary};

          & > span {
            color: ${theme.colors.text.primary};
          }
        }
      }

      & > div:not(:first-of-type) {
        width: 100%;
      }
    `,
  };
});

export default connector(withTheme2(ReportPage));
