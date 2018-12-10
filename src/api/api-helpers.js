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
 *
 * TODO: Handle unauthenticated responses
 */
const fetchAuth = async (url, options, resource, isSecondTry) => {
  const accessToken = await authorize(resource);

  const authOptions = merge(
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
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
 * Fetch plaintext requests
 * @param {string} url Full URL to fetch
 * @param {object} options Options for fetch()
 * @param {string} [resource] Resource key, as defined in `api-config.js`
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

// --- JSON requests -----------------------------------------------------------

/**
 * Fetch (and optionally, send) JSON
 * @param {string} url Full URL to fetch
 * @param {object} options Options for fetch()
 * @param {string} [resource] Resource key, as defined in `api-config.js`
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
 * GET JSON from remote resource
 * @param {string} path Relative path
 * @param {string} [resource] Resource key, as defined in `api-config.js`
 */
export const getJson = (path, resource) =>
  fetchJson(createUrl(path, resource), { method: 'GET' }, resource);

/**
 * DELETE remote resource; expect JSON response
 * @param {string} path Relative path
 * @param {string} [resource] Resource key, as defined in `api-config.js`
 */
export const deleteJson = (path, resource) =>
  fetchJson(createUrl(path, resource), { method: 'DELETE' }, resource);

/**
 * POST JSON to remote resource
 * @param {string} path Relative path
 * @param {object} data Key/values map to post as JSON
 * @param {string} [resource] Resource key, as defined in `api-config.js`
 */
export const postJson = (path, data, resource) => {
  return fetchJson(
    createUrl(path, resource),
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    resource
  );
};

/**
 * PUT JSON to remote resource
 * @param {string} path Relative path
 * @param {object} data Key/values map to post as JSON
 * @param {string} [resource] Resource key, as defined in `api-config.js`
 */
export const putJson = (path, data, resource) =>
  fetchJson(
    createUrl(path, resource),
    {
      method: 'PUT',
      body: JSON.stringify(data),
    },
    resource
  );
