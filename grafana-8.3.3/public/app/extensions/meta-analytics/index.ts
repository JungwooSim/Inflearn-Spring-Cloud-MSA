import { registerEchoBackend } from '@grafana/runtime';
import { MetaAnalyticsBackend } from './MetaAnalyticsBackend';
import { initAnalyticsDrawer } from './AnalyticsDrawer/AnalyticsDashNav';
import { initPresenceIndicators } from './PresenceIndicators';
import { contextSrv } from 'app/core/services/context_srv';
import { isValid } from '../utils';

export const initMetaAnalytics = () => {
  registerEchoBackend(new MetaAnalyticsBackend({ url: '/api/ma/events' }));

  const user = contextSrv.user;
  if (user.isSignedIn && isValid()) {
    initPresenceIndicators();
    initAnalyticsDrawer();
  }
};
