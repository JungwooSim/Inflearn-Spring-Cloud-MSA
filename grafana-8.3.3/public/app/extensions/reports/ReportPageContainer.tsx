import React, { FC, useEffect } from 'react';
import { CustomScrollbar, IconButton, useStyles2 } from '@grafana/ui';
import { css, cx } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import config from 'app/core/config';
import PageLoader from 'app/core/components/PageLoader/PageLoader';
import { NoRendererInfoBox } from './RenderingWarnings';

interface Props {
  isLoading: boolean;
  reportId: number;
}

export const ReportPageContainer: FC<Props> = ({ children, reportId, isLoading }) => {
  const styles = useStyles2(getStyles);

  useEffect(() => {
    document.title = `Reporting: ${reportId ? 'Edit report' : 'New report'}`;
  }, [reportId]);

  return (
    <div className={cx(styles.page)}>
      <CustomScrollbar autoHeightMin={'100%'}>
        <div className={styles.pageHeader}>
          <a href={'/reports'}>
            <IconButton name="arrow-left" size="xxl" />
          </a>
          <span>{`Reports / ${reportId ? 'Edit report' : 'New report'}`}</span>
        </div>
        <div className={'page-container'}>
          {isLoading ? <PageLoader /> : !config.rendererAvailable ? <NoRendererInfoBox variant="error" /> : children}
        </div>
      </CustomScrollbar>
    </div>
  );
};

const getStyles = (theme: GrafanaTheme2) => {
  return {
    header: css`
      font-size: ${theme.typography.h2.fontSize};
    `,
    page: css`
      height: 100%;
      overflow: auto;
      background: ${theme.components.panel.background};
      border: 1px solid ${theme.components.panel.borderColor};

      form {
        padding-bottom: ${theme.spacing(8)};
      }
    `,
    pageHeader: css`
      display: flex;
      align-items: center;
      font-size: ${theme.typography.h4.fontSize};
      padding: ${theme.spacing(3)};
      margin-bottom: ${theme.spacing(2)};

      a {
        display: flex;
        align-items: center;
        margin-right: ${theme.spacing(1)};
      }
    `,
  };
};
