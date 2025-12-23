import { configVariables } from './config'

export function urlToAppMonitoring(appName: string): string {
  return `https://grafana.${configVariables.RADIX_DNS_ZONE}/d/LOZYXe5Wk/default-dashboard?orgId=1&refresh=30s&var-Radixapp=${appName}`
}
