import configHandler from './config';

export const urlToMonitoring = () => {
  return `https://grafana.${configHandler.getDomain()}`;
};

export const urlToAppMonitoring = appName => {
  return `${urlToMonitoring()}/d/LOZYXe5Wk/default-dashboard?orgId=1&refresh=30s&var-Radixapp=${appName}`;
};
