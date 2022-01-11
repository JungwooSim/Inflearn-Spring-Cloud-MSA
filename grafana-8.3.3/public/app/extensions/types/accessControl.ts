// Permission actions (Enterprise-specific)
export enum AccessControlAction {
  ReportingAdminCreate = 'reports.admin:create',
  ReportingAdminWrite = 'reports.admin:write',
  ReportingDelete = 'reports:delete',
  ReportingRead = 'reports:read',
  ReportingSend = 'reports:send',
  ReportingSettingsWrite = 'reports.settings:write',
  ReportingSettingsRead = 'reports.settings:read',

  DataSourcesPermissionsRead = 'datasources.permissions:read',
  DataSourcesPermissionsCreate = 'datasources.permissions:create',
  DataSourcesPermissionsDelete = 'datasources.permissions:delete',
  DataSourcesPermissionsToggle = 'datasources.permissions:toggle',

  LicensingRead = 'licensing:read',
  LicensingUpdate = 'licensing:update',
  LicensingReportsRead = 'licensing.reports:read',
}
