import React, { FC } from 'react';
import { OrgRole } from '@grafana/data';
import { Select } from '@grafana/ui';

interface Props {
  value: OrgRole;
  disabled?: boolean;
  'aria-label'?: string;
  inputId?: string;
  onChange: (role: OrgRole) => void;
  autoFocus?: boolean;
}

const options = Object.keys(OrgRole).map((key) => ({ label: key, value: key }));

export const OrgRolePicker: FC<Props> = ({
  value,
  onChange,
  'aria-label': ariaLabel,
  inputId,
  autoFocus,
  ...restProps
}) => {
  return (
    <Select
      menuShouldPortal
      inputId={inputId}
      value={value}
      options={options}
      onChange={(val) => onChange(val.value as OrgRole)}
      placeholder="Choose role..."
      aria-label={ariaLabel}
      autoFocus={autoFocus}
      {...restProps}
    />
  );
};
