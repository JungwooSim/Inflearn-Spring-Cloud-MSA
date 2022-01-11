import { dateTime } from '@grafana/data';
import { config } from 'app/core/config';

export const isValid = (): boolean => {
  const { expiry, hasLicense } = config.licenseInfo;
  return hasLicense && expiry > 0 && dateTime(expiry * 1000) > dateTime();
};

export const isExpired = (): boolean => {
  const { expiry, hasLicense } = config.licenseInfo;
  return hasLicense && expiry > 0 && dateTime(expiry * 1000) < dateTime();
};

export const isInvalid = (): boolean => {
  const { expiry, hasLicense } = config.licenseInfo;
  return hasLicense && !expiry;
};
