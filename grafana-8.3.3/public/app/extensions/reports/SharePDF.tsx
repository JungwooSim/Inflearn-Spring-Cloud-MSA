import React, { FC, useState } from 'react';
import { urlUtil } from '@grafana/data';
import { ModalTabContent, Button, LinkButton, RadioButtonGroup, Field, Switch, Modal } from '@grafana/ui';
import { ShareModalTabProps } from 'app/features/dashboard/components/ShareModal';
import { NoRendererInfoBox } from './RenderingWarnings';
import { ReportOrientation, ReportLayout, reportOrientations, reportLayouts } from '../types';
import config from 'app/core/config';
import { getRootPath } from '../utils/url';
import { isExpired } from '../utils';
import { collectVariables } from './utils';
import { UnavailableFeatureInfoBox } from './UnavailableFeatureInfoBox';

export const SharePDF: FC<ShareModalTabProps> = ({ dashboard, onDismiss }) => {
  const [orientation, setOrientation] = useState<ReportOrientation>('portrait');
  const [layout, setLayout] = useState<ReportLayout>('simple');
  const [useSelectedVariables, setUseSelectedVariables] = useState(false);

  const buildPdfLink = () => {
    let pdfUrl = `${getRootPath()}/api/reports/render/pdf/${dashboard.id}`;
    const params: Record<string, string> = { orientation, layout };
    if (useSelectedVariables) {
      const variables = collectVariables();
      params.variables = JSON.stringify(variables);
    }
    pdfUrl = urlUtil.appendQueryToUrl(pdfUrl, urlUtil.toUrlParams(params));

    return pdfUrl;
  };

  const onOrientationChange = (orientation: ReportOrientation) => {
    setOrientation(orientation);
  };

  const onLayoutChange = (layout: ReportLayout) => {
    setLayout(layout);
  };

  if (!config.rendererAvailable) {
    return <NoRendererInfoBox />;
  }

  if (isExpired()) {
    return (
      <UnavailableFeatureInfoBox
        message="Rendering a dashboard as a PDF document is not available with an expired license.
            To enable this feature, update your license."
      />
    );
  }

  return (
    <ModalTabContent icon="file-alt">
      <p className="share-modal-info-text">Save the dashboard as a PDF document.</p>
      <Field label="Orientation">
        <RadioButtonGroup options={reportOrientations} value={orientation} onChange={onOrientationChange} />
      </Field>
      <Field label="Layout">
        <RadioButtonGroup options={reportLayouts} value={layout} onChange={onLayoutChange} />
      </Field>
      {!!Object.keys(collectVariables()).length && (
        <Field
          label={'Use current variable values'}
          description={
            'If you modify the default variable values, then your modifications are used when generating PDF documents, rather than those saved as dashboard defaults.'
          }
        >
          <Switch onChange={() => setUseSelectedVariables(!useSelectedVariables)} value={useSelectedVariables} />
        </Field>
      )}
      <Modal.ButtonRow>
        <Button variant="secondary" onClick={onDismiss}>
          Cancel
        </Button>
        <LinkButton variant="primary" href={buildPdfLink()} target="_blank" rel="noreferrer noopener">
          Save as PDF
        </LinkButton>
      </Modal.ButtonRow>
    </ModalTabContent>
  );
};
