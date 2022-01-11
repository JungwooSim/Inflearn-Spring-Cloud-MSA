import React from 'react';
import { Props } from './DataSourceCache';
import { Field, Switch, Input, Button } from '@grafana/ui';

interface CacheSettingsProps {
  loading: boolean;
  setUseDefaultTTL: (useDefaultTTL: boolean) => void;
  setTtlMs: (ttl: number) => void;
}

export const CacheSettingsForm = (props: Props & CacheSettingsProps) => {
  const {
    updateDataSourceCache,
    pageId,
    useDefaultTTL,
    setUseDefaultTTL,
    defaultTTLMs,
    ttlMs,
    setTtlMs,
    loading,
    enabled,
    dataSourceID,
    dataSourceUID,
  } = props;

  return (
    <div>
      <Field
        horizontal
        description="Enable this to use the default TTL set in Grafana's configuration"
        label="Use Default TTL"
        disabled={loading}
      >
        <Switch
          value={useDefaultTTL}
          onChange={() => {
            setUseDefaultTTL(!useDefaultTTL);
          }}
        />
      </Field>
      <Field
        horizontal
        description="The time-to-live for a single cache item in milliseconds. Example: 5000"
        label="TTL"
        disabled={loading || useDefaultTTL}
      >
        <Input
          type="number"
          placeholder="1000"
          min={0}
          value={(useDefaultTTL ? defaultTTLMs : ttlMs) || 0}
          onChange={(el) => {
            setTtlMs(el.currentTarget.valueAsNumber);
          }}
        />
      </Field>
      <Button
        disabled={loading}
        icon="save"
        onClick={() =>
          updateDataSourceCache(pageId, {
            dataSourceID,
            dataSourceUID,
            enabled,
            defaultTTLMs,
            ttlMs,
            useDefaultTTL,
          })
        }
      >
        Save
      </Button>
    </div>
  );
};
