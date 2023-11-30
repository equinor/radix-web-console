export const dynatraceApiBaseUri = `${
  import.meta.env.VITE_DYNATRACE_API_BASE_URI || window.location.host
}/uptime-api`;
export const radixApiBaseUri = `${
  import.meta.env.VITE_RADIX_API_BASE_URI || window.location.host
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
