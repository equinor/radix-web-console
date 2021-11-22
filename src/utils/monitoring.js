import { configVariables } from './config';

export const urlToAppMonitoring = (appName) => {
  return `https://grafana.${configVariables.RADIX_CLUSTER_BASE}/d/LOZYXe5Wk/default-dashboard?orgId=1&refresh=30s&var-Radixapp=${appName}`;
};
