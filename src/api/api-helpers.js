import merge from 'lodash/merge';

import { baseUri } from './api-config';
import { NetworkException } from '../utils/exception';

/**
 * Create a full URL to the API
 * @param {string} path Relative path
 * @param {string} [protocol] Protocol to use, e.g. 'wss:'
 */
export const createApiUrl = (path, protocol = window.location.protocol) =>
  `${protocol}//${baseUri}${path}`;

// --- Generic (authenticated) requests ----------------------------------------

/**
 * Authorised call to fetch(). Supports GET/POST/etc by setting the appropriate
 * key in `options`
 * @param {string} url Full URL to fetch
 * @param {object} options Options for fetch()
 */
const fetchAuth = async (url, options, isSecondTry) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    console.warn('fetchAuth request failed', response);

    if (response.status === 401 && !isSecondTry) {
      console.info('trying again…');
      return await fetchAuth(url, options, true);
    }

    let message = response.statusText;

    try {
      message = await response.json();
      message = message.message;
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
};

// --- Plaintext requests ------------------------------------------------------

/**
 * @callback PlaintextFetcher
 * @param {string} path The path to the resource
 */

/**
 * Fetch plaintext requests
 * @param {string} url Full URL to fetch
 * @param {object} options Options for fetch()
 * @returns {Promise<string>}
 */
const fetchPlain = async (url, options) => {
  const response = await fetchAuth(url, options);
  return await response.text();
};

/**
 * GET plaintext from remote resource
 * @param {string} path Relative path
 */
export const getText = path =>
  fetchPlain(createApiUrl(path), { method: 'GET' });

/**
 * DELETE remote resource
 * @param {string} path Relative path
 */
export const deleteRequest = async path =>
  fetchPlain(createApiUrl(path), { method: 'DELETE' });

/**
 * POST action
 * @param {string} path Relative path
 */
export const postRequest = async path =>
  fetchPlain(createApiUrl(path), { method: 'POST' });

// --- JSON requests -----------------------------------------------------------

/**
 * @callback JsonFetcher
 * @param {string} path The path to the resource
 * @returns {Promise}
 */

/**
 * @callback JsonFetcherWithBody
 * @param {string} path The path to the resource
 * @param {*} data Data to send to server
 * @returns {Promise}
 */

/**
 * Fetch (and optionally, send) JSON
 * @param {string} url Full URL to fetch
 * @param {object} options Options for fetch()
 * @returns {Promise}
 */
const fetchJson = async (url, options) => {
  const jsonOptions = merge(
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    options
  );

  const response = await fetchAuth(url, jsonOptions);
  return await response.json();
};

/**
 * Create a request generator function without request body support
 * @param {string} method HTTP method
 * @returns {JsonFetcher}
 */
const makeJsonRequester = method => path =>
  fetchJson(createApiUrl(path), { method });

/**
 * Create a request generator function with request body support
 * @param {string} method HTTP method
 * @returns {JsonFetcherWithBody}
 */
const makeJsonRequesterWithBody = method => (path, data) =>
  fetchJson(createApiUrl(path), { method, body: JSON.stringify(data) });

/**
 * GET JSON from remote resource
 * @function
 * @type {JsonFetcher}
 */
export const getJson = makeJsonRequester('GET');

/**
 * DELETE remote resource; expect JSON response
 * @function
 * @type {JsonFetcher}
 */
export const deleteJson = makeJsonRequester('DELETE');

/**
 * POST JSON to remote resource with no body
 * @function
 * @type {JsonFetcher}
 */
export const postJsonWithNoBody = makeJsonRequester('POST');

/**
 * POST JSON to remote resource
 * @function
 * @type {JsonFetcherWithBody}
 */
export const postJson = makeJsonRequesterWithBody('POST');

/**
 * PUT JSON to remote resource
 * @function
 * @type {JsonFetcherWithBody}
 */
export const putJson = makeJsonRequesterWithBody('PUT');

/**
 * PATCH JSON to remote resource
 * @function
 * @type {JsonFetcherWithBody}
 */
export const patchJson = makeJsonRequesterWithBody('PATCH');
