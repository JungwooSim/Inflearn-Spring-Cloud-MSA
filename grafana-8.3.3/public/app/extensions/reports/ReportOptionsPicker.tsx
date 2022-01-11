import React, { FC } from 'react';
import { Field, RadioButtonGroup } from '@grafana/ui';
import { RadioButtonSize } from '@grafana/ui/src/components/Forms/RadioButtonGroup/RadioButton';
import { ReportOptions, ReportOrientation, ReportLayout, reportOrientations, reportLayouts } from '../types';

type Options = Pick<ReportOptions, 'orientation' | 'layout'>;
interface Props {
  options: Options;
  onChange: (options: Options) => void;
  size?: RadioButtonSize;
  fieldClassName?: string;
}

const descriptions = new Map<ReportLayout, string>([
  ['grid', 'Display the panels in their positions on the dashboard.'],
  ['simple', 'Display one panel per row.'],
]);

export const ReportOptionsPicker: FC<Props> = ({ onChange, options, fieldClassName, size = 'md' }) => {
  const orientation = options.orientation || 'landscape';
  const layout = options.layout || 'grid';

  const onOrientationChange = (newOrientation?: ReportOrientation) => {
    const newOptions: Options = {
      ...options,
      orientation: newOrientation!,
    };
    onChange(newOptions);
  };

  const onLayoutChange = (newLayout?: ReportLayout) => {
    const newOptions: Options = {
      ...options,
      layout: newLayout!,
    };
    onChange(newOptions);
  };

  const selectedOrientation = reportOrientations.find((l) => l.value === orientation)?.value;
  const selectedLayout = reportLayouts.find((l) => l.value === layout)?.value;

  return (
    <>
      <Field className={fieldClassName} label="Orientation">
        <RadioButtonGroup
          onChange={onOrientationChange}
          options={reportOrientations}
          value={selectedOrientation}
          size={size}
        />
      </Field>
      <Field className={fieldClassName} label="Layout" description={descriptions.get(selectedLayout || 'simple')}>
        <RadioButtonGroup onChange={onLayoutChange} options={reportLayouts} value={selectedLayout} size={size} />
      </Field>
    </>
  );
};
