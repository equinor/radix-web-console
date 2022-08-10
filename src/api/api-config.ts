export const costApiBaseUri: string = `${window.location.host}/cost-api`;
export const dynatraceApiBaseUri: string = `${window.location.host}/dynatrace/api`;
export const radixApiBaseUri: string = `${window.location.host}/api/v1`;
export const scanApiBaseUri: string = `${window.location.host}/scan-api`;

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
