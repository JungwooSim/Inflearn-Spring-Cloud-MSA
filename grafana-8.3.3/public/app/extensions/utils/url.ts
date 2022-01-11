import config from 'app/core/config';

export const getRootPath = (root = window.location.origin) => {
  let rootPath = root + config.appSubUrl;
  if (rootPath.endsWith('/')) {
    rootPath.slice(0, -1);
  }

  return rootPath;
};
