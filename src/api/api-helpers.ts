import { merge } from 'lodash';
import { NetworkException } from '../utils/exception';

export type RadixRequestInit = Omit<RequestInit, 'body' | 'method'>;

const AUTH_RETRY_INTERVAL = 3000;

function isJsonStringified(data: unknown): boolean {
  try {
    JSON.parse(data as string);
  } catch (err) {
    return false;
  }

  return true;
}

// --- Generic request handler -------------------------------------------------

/**
 * Souped-up call to fetch(). Supports GET/POST/etc by setting the appropriate
 * key in `options`
 * @param {string} url Full URL to fetch
 * @param {object} options Options for fetch()
 */
async function radixFetch(
  url: RequestInfo | URL,
  options?: RequestInit,
  isSecondTry?: boolean
): Promise<Response> {
  const response = await fetch(url, options);

  if (!response.ok) {
    console.warn('radixFetch request failed', response);

    if (response.status === 401 && !isSecondTry) {
      console.info(
        'Request resulted in 401; allowing a few seconds to renew credentials…'
      );
      return new Promise((resolve, reject) =>
        setTimeout(
          () => radixFetch(url, options, true).then(resolve).catch(reject),
          AUTH_RETRY_INTERVAL
        )
      );
    }

    let message: string;
    try {
      const json = await response.json();
      message = json.message;
    } catch (eJson) {
      try {
        message = await response.text();
      } catch (eText) {
        message = response.statusText;
      }
    }

    throw new NetworkException(message, response.status);
  }

  return response;
}

// --- JSON requests -----------------------------------------------------------

/**
 * Fetch (and optionally, send) JSON
 * @param {string} url Full URL to fetch
 * @param {object} options Options for fetch()
 * @returns {Promise}
 */
async function fetchJson<T>(
  url: RequestInfo | URL,
  options?: RequestInit
): Promise<T> {
  const jsonOptions = merge<RequestInit, RequestInit | undefined>(
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    options
  );

  const response = await radixFetch(url, jsonOptions);
  return response.status === 204
    ? await response.text()
    : await response.json();
}

/**
 * Create a request generator function with request body support
 * @param {string} method HTTP method
 * @returns {JsonFetcherWithBody | JsonFetcher}
 */
function makeJsonRequester<D extends string | void | unknown>(
  method: string
): <T>(url: string, options?: RadixRequestInit, data?: D) => Promise<T> {
  return async function (url, options, data) {
    return fetchJson(url, {
      ...options,
      method: method,
      ...(data === undefined || data === null
        ? undefined
        : {
            body: isJsonStringified(data)
              ? (data as unknown as string)
              : JSON.stringify(data),
          }),
    });
  };
}

/**
 * GET JSON from remote resource
 * @function
 * @type {JsonFetcher}
 */
export const getJson: <T>(
  url: string,
  options?: RadixRequestInit
) => Promise<T> = makeJsonRequester<void>('GET');
