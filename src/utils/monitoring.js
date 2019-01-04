import configHandler from './config';

export const urlToMonitoring = () => {
  return `https://grafana.${configHandler.getDomain()}`;
};
