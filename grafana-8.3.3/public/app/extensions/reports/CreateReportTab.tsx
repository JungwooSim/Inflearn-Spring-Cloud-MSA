import React from 'react';
import { LinkButton } from '@grafana/ui';
import { urlUtil } from '@grafana/data';
import { getVariablesUrlParams } from 'app/features/variables/getAllVariableValuesForUrl';
import { getTimeSrv } from 'app/features/dashboard/services/TimeSrv';
import { ShareModalTabProps } from 'app/features/dashboard/components/ShareModal';

export const CreateReportTab = ({ dashboard, onDismiss }: ShareModalTabProps) => {
  const getUrl = () => {
    const variablesQuery = urlUtil.toUrlParams(getVariablesUrlParams());
    const timeRangeUrl = urlUtil.toUrlParams(getTimeSrv().timeRangeForUrl());

    return `?${variablesQuery}&${timeRangeUrl}&db-uid=${dashboard.uid}&db-id=${dashboard.id}&db-name=${dashboard.title}`;
  };

  return (
    <LinkButton href={`reports/new/${getUrl()}`} onClick={onDismiss}>
      Create report using this dashboard
    </LinkButton>
  );
};
