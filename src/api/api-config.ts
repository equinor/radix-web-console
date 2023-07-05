export const costApiBaseUri = `${
  process.env.VITE_COST_API_BASE_URI || window.location.host
}/cost-api`;
export const dynatraceApiBaseUri = `${
  process.env.VITE_DYNATRACE_API_BASE_URI || window.location.host
}/uptime-api`;
export const logApiBaseUri = `${
  process.env.VITE_LOG_API_BASE_URI || window.location.host
}/log-api`;
export const scanApiBaseUri = `${
  process.env.VITE_SCAN_API_BASE_URI || window.location.host
}/scan-api`;
export const radixApiBaseUri = `${
  process.env.VITE_RADIX_API_BASE_URI || window.location.host
}/api/v1`;

/**
 * Create a full URL to the API
 * @param {string} uri Api uri
 * @param {string} path Relative path
 * @param {string} [protocol] Protocol to use, e.g. 'wss:'
 */
export function createApiUrl(
  uri: string,
  path: string,
  protocol: string = window.location.protocol
): string {
  return `${protocol}//${uri}${path}`;
}

/**
 * Create a full URL to the Radix Cost API
 * @param {string} path Relative path
 * @param {string} [protocol] Protocol to use, e.g. 'wss:'
 */
export function createCostApiUrl(
  path: string,
  protocol: string = window.location.protocol
): string {
  return createApiUrl(costApiBaseUri, path, protocol);
}

/**
 * Create a full URL to the Radix Dynatrace API
 * @param {string} path Relative path
 * @param {string} [protocol] Protocol to use, e.g. 'wss:'
 */
export function createDynatraceApiUrl(
  path: string,
  protocol: string = window.location.protocol
): string {
  return createApiUrl(dynatraceApiBaseUri, path, protocol);
}

/**
 * Create a full URL to the Radix Log API
 * @param {string} path Relative path
 * @param {string} [protocol] Protocol to use, e.g. 'wss:'
 */
export function createLogApiUrl(
  path: string,
  protocol: string = window.location.protocol
): string {
  return createApiUrl(logApiBaseUri, path, protocol);
}

/**
 * Create a full URL to the Radix API
 * @param {string} path Relative path
 * @param {string} [protocol] Protocol to use, e.g. 'wss:'
 */
export function createRadixApiUrl(
  path: string,
  protocol: string = window.location.protocol
): string {
  return createApiUrl(radixApiBaseUri, path, protocol);
}

/**
 * Create a full URL to the Radix Scan API
 * @param {string} path Relative path
 * @param {string} [protocol] Protocol to use, e.g. 'wss:'
 */
export function createScanApiUrl(
  path: string,
  protocol: string = window.location.protocol
): string {
  return createApiUrl(scanApiBaseUri, path, protocol);
}
