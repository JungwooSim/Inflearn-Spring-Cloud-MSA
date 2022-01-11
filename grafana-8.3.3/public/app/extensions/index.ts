import LicensePage from './licensing/LicensePage';
import ReportsList from './reports/ReportsListPage';
import ReportsSettings from './reports/ReportsSettingsPage';
import ReportPage from './reports/ReportPage';
import CSVExportPage from './reports/CSVExportPage';
import reportsReducers from './reports/state/reducers';
import { initReporting } from './reports';
import DataSourcePermissions from './permissions/DataSourcePermissions';
import dataSourcePermissionReducers from './permissions/state/reducers';
import DataSourceCache from './caching/DataSourceCache';
import dataSourceCacheReducers from './caching/state/reducers';
import { addRootReducer } from 'app/store/configureStore';
import { initWhitelabeling } from './whitelabeling';
import { config } from 'app/core/config';
import { initLicenseWarnings } from './licensing';
import { initMetaAnalytics } from './meta-analytics';
import { isExpired } from './utils';
import DataSourceInsights from './meta-analytics/DataSourceInsights/DataSourceInsights';
import metaAnalyticsReducers from './meta-analytics/state/reducers';
import { extraRoutes } from 'app/routes/routes';
import { AccessControlAction as EnterpriseAccessControlAction } from './types';
import { AccessControlAction, DashboardRoutes } from 'app/types';
import { contextSrv } from 'app/core/core';
import { initPageBanners } from './banners';
import { initRecordedQueries } from './recorded-queries';
import { recordedQueryReducer } from './recorded-queries/state/reducers';
import { initEnterpriseAdmin } from './admin';
import { RecordedQueriesConfig } from './recorded-queries/RecordedQueriesConfig';
import { WriteTargetConfig } from './recorded-queries/WriteTargetConfig';

export function addExtensionReducers() {
  if (!config.licenseInfo.hasLicense) {
    return;
  }

  addRootReducer({
    ...dataSourcePermissionReducers,
    ...dataSourceCacheReducers,
    ...reportsReducers,
    ...metaAnalyticsReducers,
    ...recordedQueryReducer,
  });
}

function initEnterprise() {
  initWhitelabeling();
  initLicenseWarnings();
  initReporting();
  initMetaAnalytics();
  initRecordedQueries();
  initEnterpriseAdmin();

  extraRoutes.push(
    ...[
      {
        path: '/datasources/edit/:uid/cache',
        component: DataSourceCache,
      },
      {
        path: '/reports',
        component: ReportsList,
      },
      {
        path: '/reports/edit/:id',
        component: ReportPage,
      },
      {
        path: '/reports/settings',
        component: ReportsSettings,
      },
      {
        path: '/datasources/edit/:id/insights',
        component: DataSourceInsights as any,
      },
      {
        path: '/d-csv/:uid',
        pageClass: 'dashboard-solo',
        routeName: DashboardRoutes.Normal,
        component: CSVExportPage,
      },
    ]
  );

  if (contextSrv.hasPermission(AccessControlAction.DataSourcesPermissionsRead)) {
    extraRoutes.push({
      path: '/datasources/edit/:id/permissions',
      component: DataSourcePermissions,
    });
  }

  const showRecordQuery =
    config?.licenseInfo?.hasLicense && config?.recordedQueries?.enabled && config?.featureToggles?.recordedQueries;
  if (contextSrv.isEditor && showRecordQuery) {
    extraRoutes.push(
      ...[
        {
          path: '/recorded-queries',
          component: RecordedQueriesConfig,
        },
        {
          path: '/recorded-queries/write-target',
          component: WriteTargetConfig,
        },
      ]
    );
  }

  if (!isExpired()) {
    extraRoutes.push({
      path: '/reports/new',
      component: ReportPage as any,
    });
  }
}

// initUnlicensed initialized features which are defined in Enterprise but
// should be available when running without a license.
function initUnlicensed() {
  initPageBanners();

  extraRoutes.push({
    path: '/admin/licensing',
    roles: () =>
      contextSrv.evaluatePermission(() => ['Admin'], [
        EnterpriseAccessControlAction.LicensingRead,
        AccessControlAction.ActionServerStatsRead,
      ]),
    component: LicensePage,
  });
}

export function init() {
  initUnlicensed();

  if (config.licenseInfo.hasLicense) {
    initEnterprise();
  }
}
