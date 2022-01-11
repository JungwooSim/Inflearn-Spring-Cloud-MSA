import React from 'react';
import { Props } from './DataSourceCache';
import { Button } from '@grafana/ui';

export const CacheSettingsDisable = (props: Props) => {
  const { disableDataSourceCache, pageId } = props;
  return (
    <Button icon="trash-alt" variant="destructive" onClick={() => disableDataSourceCache(pageId)}>
      Disable
    </Button>
  );
};
