import React, { FormEvent } from 'react';
import { css } from '@emotion/css';
import { Button, FileUpload, stylesFactory } from '@grafana/ui';

interface Props {
  isUploading: boolean;
  title?: string;
  onFileUpload: (event: FormEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
}

export const LicenseTokenUpload = ({ isUploading, title, onFileUpload, isDisabled }: Props) => {
  const styles = getStyles();

  return (
    <>
      {title && <h2 className={styles.title}>{title}</h2>}
      {isUploading ? (
        <Button disabled={true}>Uploading…</Button>
      ) : isDisabled ? (
        <Button disabled={true}>Upload a new token</Button>
      ) : (
        <FileUpload onFileUpload={onFileUpload} accept=".jwt">
          Upload a new token
        </FileUpload>
      )}
    </>
  );
};

const getStyles = stylesFactory(() => {
  return {
    title: css`
      margin-top: 30px;
      margin-bottom: 20px;
    `,
  };
});
