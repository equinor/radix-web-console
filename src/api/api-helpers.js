import merge from 'lodash/merge';

import { getResource } from './api-config';
import { authorize, clearAuth } from './auth';
import { NetworkException } from '../utils/exception';

/**
 * Create a full URL to a remote resource
 * @param {string} path Relative path
 * @param {string} [resource] Resource key, as defined in `api-config.js`
 * @param {string} [protocol] Protocol to use, e.g. 'wss://'
 */
export const createUrl = (path, resource, protocol = 'https://') =>
  `${protocol}${getResource(resource).baseUri}${path}`;

// --- Generic (authenticated) requests ----------------------------------------

/**
 * Authorised call to fetch(). Supports GET/POST/etc by setting the appropriate
 * key in `options`
 * @param {string} url Full URL to fetch
 * @param {object} options Options for fetch()
 * @param {string} [resource] Resource key, as defined in `api-config.js`
 */
const fetchAuth = async (url, options, resource, isSecondTry) => {
  const accessToken = await authorize(resource);

  const authOptions = merge(
    { headers: { Authorization: `Bearer ${accessToken}` } },
    options
  );

  const response = await fetch(url, authOptions);

  if (!response.ok) {
    console.warn('fetchAuth request failed', response);

    if (response.status === 401 && !isSecondTry) {
      console.info('trying again…');
      clearAuth();
      return await fetchAuth(url, options, resource, true);
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
 * @param {string} resource Resource key, as defined in `api-config.js`
 */

/**
 * Fetch plaintext requests
 * @param {string} url Full URL to fetch
 * @param {object} options Options for fetch()
 * @param {string} [resource] Resource key, as defined in `api-config.js`
 * @returns {Promise<string>}
 */
const fetchPlain = async (url, options, resource) => {
  const response = await fetchAuth(url, options, resource);
  return await response.text();
};

/**
 * GET plaintext from remote resource
 * @param {string} path Relative path
 * @param {string} [resource] Resource key, as defined in `api-config.js`
 */
export const getText = (path, resource) =>
  fetchPlain(createUrl(path, resource), { method: 'GET' }, resource);

/**
 * DELETE remote resource
 * @param {string} path Relative path
 * @param {string} [resource] Resource key, as defined in `api-config.js`
 */
export const deleteRequest = async (path, resource) =>
  fetchPlain(createUrl(path, resource), { method: 'DELETE' }, resource);

/**
 * POST action
 * @param {string} path Relative path
 * @param {string} [resource] Resource key, as defined in `api-config.js`
 */
export const postRequest = async (path, resource) =>
  fetchPlain(createUrl(path, resource), { method: 'POST' }, resource);

// --- JSON requests -----------------------------------------------------------

/**
 * @callback JsonFetcher
 * @param {string} path The path to the resource
 * @param {string} resource Resource key, as defined in `api-config.js`
 * @returns {Promise}
 */

/**
 * @callback JsonFetcherWithBody
 * @param {string} path The path to the resource
 * @param {*} data Data to send to server
 * @param {string} resource Resource key, as defined in `api-config.js`
 * @returns {Promise}
 */

/**
 * Fetch (and optionally, send) JSON
 * @param {string} url Full URL to fetch
 * @param {object} options Options for fetch()
 * @param {string} [resource] Resource key, as defined in `api-config.js`
 * @returns {Promise}
 */
const fetchJson = async (url, options, resource) => {
  const jsonOptions = merge(
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    options
  );

  const response = await fetchAuth(url, jsonOptions, resource);
  return await response.json();
};

/**
 * Create a request generator function without request body support
 * @param {string} method HTTP method
 * @returns {JsonFetcher}
 */
const makeJsonRequester = method => (path, resource) =>
  fetchJson(createUrl(path, resource), { method }, resource);

/**
 * Create a request generator function with request body support
 * @param {string} method HTTP method
 * @returns {JsonFetcherWithBody}
 */
const makeJsonRequesterWithBody = method => (path, data, resource) =>
  fetchJson(
    createUrl(path, resource),
    { method, body: JSON.stringify(data) },
    resource
  );

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
