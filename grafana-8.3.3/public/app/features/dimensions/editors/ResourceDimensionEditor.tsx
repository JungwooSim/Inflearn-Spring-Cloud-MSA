import React, { FC, useCallback, useState } from 'react';
import {
  FieldNamePickerConfigSettings,
  GrafanaTheme2,
  StandardEditorProps,
  StandardEditorsRegistryItem,
} from '@grafana/data';
import { InlineField, InlineFieldRow, RadioButtonGroup, Button, Modal, Input, useStyles2 } from '@grafana/ui';
import SVG from 'react-inlinesvg';
import { css } from '@emotion/css';

import { ResourceDimensionConfig, ResourceDimensionMode, ResourceDimensionOptions } from '../types';
import { FieldNamePicker } from '../../../../../packages/grafana-ui/src/components/MatchersUI/FieldNamePicker';
import { ResourcePicker } from './ResourcePicker';
import { getPublicOrAbsoluteUrl, ResourceFolderName } from '..';

const resourceOptions = [
  { label: 'Fixed', value: ResourceDimensionMode.Fixed, description: 'Fixed value' },
  { label: 'Field', value: ResourceDimensionMode.Field, description: 'Use a string field result' },
  //  { label: 'Mapping', value: ResourceDimensionMode.Mapping, description: 'Map the results of a value to an svg' },
];

const dummyFieldSettings: StandardEditorsRegistryItem<string, FieldNamePickerConfigSettings> = {
  settings: {},
} as any;

export const ResourceDimensionEditor: FC<
  StandardEditorProps<ResourceDimensionConfig, ResourceDimensionOptions, any>
> = (props) => {
  const { value, context, onChange, item } = props;
  const labelWidth = 9;
  const [isOpen, setOpen] = useState(false);
  const styles = useStyles2(getStyles);

  const onModeChange = useCallback(
    (mode) => {
      onChange({
        ...value,
        mode,
      });
    },
    [onChange, value]
  );

  const onFieldChange = useCallback(
    (field) => {
      onChange({
        ...value,
        field,
      });
    },
    [onChange, value]
  );

  const onFixedChange = useCallback(
    (fixed?: string) => {
      onChange({
        ...value,
        fixed: fixed ?? '',
      });
      setOpen(false);
    },
    [onChange, value]
  );

  const onClear = (event: React.MouseEvent) => {
    event.stopPropagation();
    onChange({ mode: ResourceDimensionMode.Fixed, fixed: '', field: '' });
  };

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const mode = value?.mode ?? ResourceDimensionMode.Fixed;
  const showSourceRadio = item.settings?.showSourceRadio ?? true;
  const mediaType = item.settings?.resourceType ?? 'icon';
  const folderName = item.settings?.folderName ?? ResourceFolderName.Icon;
  let srcPath = '';
  if (mediaType === 'icon') {
    if (value?.fixed) {
      srcPath = getPublicOrAbsoluteUrl(value.fixed);
    } else if (item.settings?.placeholderValue) {
      srcPath = getPublicOrAbsoluteUrl(item.settings.placeholderValue);
    }
  }

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} title={`Select ${mediaType}`} onDismiss={() => setOpen(false)} closeOnEscape>
          <ResourcePicker
            onChange={onFixedChange}
            value={value?.fixed}
            mediaType={mediaType}
            folderName={folderName}
            setOpen={setOpen}
          />
        </Modal>
      )}
      {showSourceRadio && (
        <InlineFieldRow>
          <InlineField label="Source" labelWidth={labelWidth} grow={true}>
            <RadioButtonGroup value={mode} options={resourceOptions} onChange={onModeChange} fullWidth />
          </InlineField>
        </InlineFieldRow>
      )}
      {mode !== ResourceDimensionMode.Fixed && (
        <InlineFieldRow>
          <InlineField label="Field" labelWidth={labelWidth} grow={true}>
            <FieldNamePicker
              context={context}
              value={value.field ?? ''}
              onChange={onFieldChange}
              item={dummyFieldSettings}
            />
          </InlineField>
        </InlineFieldRow>
      )}
      {mode === ResourceDimensionMode.Fixed && (
        <InlineFieldRow onClick={openModal} className={styles.pointer}>
          <InlineField label={null} grow>
            <Input
              value={niceName(value?.fixed) ?? ''}
              placeholder={item.settings?.placeholderText ?? 'Select a value'}
              readOnly={true}
              prefix={srcPath && <SVG src={srcPath} className={styles.icon} />}
              suffix={<Button icon="times" variant="secondary" fill="text" size="sm" onClick={onClear} />}
            />
          </InlineField>
        </InlineFieldRow>
      )}
      {mode === ResourceDimensionMode.Mapping && (
        <InlineFieldRow>
          <InlineField label="Mappings" labelWidth={labelWidth} grow={true}>
            <div>TODO mappings editor!</div>
          </InlineField>
        </InlineFieldRow>
      )}
    </>
  );
};

export function niceName(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }
  const idx = value.lastIndexOf('/');
  if (idx > 0) {
    return value.substring(idx + 1);
  }
  return value;
}

const getStyles = (theme: GrafanaTheme2) => ({
  icon: css`
    vertical-align: middle;
    display: inline-block;
    fill: currentColor;
    max-width: 25px;
  `,
  pointer: css`
    cursor: pointer;
    input[readonly] {
      cursor: pointer;
    }
  `,
});
