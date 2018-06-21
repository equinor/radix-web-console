import { getResource } from './api-config';
import { authorize } from './auth';
import { NetworkException } from '../utils/exception';

import ResilientWebSocket from '../utils/resilient-websocket';

/**
 * Create a full URL to a remote resource
 * @param {string} path Relative path
 * @param {string} [resource] Resource key, as defined in `api-config.js`
 * @param {string} [protocol] Protocol to use, e.g. 'wss://'
 */
export const createUrl = (path, resource, protocol = 'https://') =>
  `${protocol}${getResource(resource).baseUri}${path}`;

// --- JSON requests -----------------------------------------------------------

/**
 * Headers to add to all JSON requests
 */
const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

/**
 * Authorised call to fetch(), expecting a JSON response. Supports GET/POST/etc
 * by setting the appropriate key in `options`
 * @param {string} url Full URL to fetch
 * @param {object} options Options for fetch()
 * @param {string} [resource] Resource key, as defined in `api-config.js`
 *
 * TODO: Handle unauthenticated responses
 */
const fetchJson = (url, options, resource) =>
  authorize(resource).then(accessToken =>
    fetch(url, {
      ...options,
      headers: {
        ...jsonHeaders,
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new NetworkException(response.statusText, response.status);
    })
  );

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

// --- websocket requests ------------------------------------------------------

/**
 *
 * @see https://github.com/kubernetes/kubernetes/pull/47740
 * @param {string} path Relative path
 * @param {string} resource Resource key, as defined in `api-config.js`
 */
export const openWs = (path, resource) =>
  authorize(resource).then(accessToken => {
    const url = createUrl(path, resource, 'wss://') + '?watch=true';
    // Token must be *unpadded* (i.e. no trailing "=") base64
    const encodedJwt = btoa(accessToken).replace(/=/g, '');
    return new ResilientWebSocket(url, [
      `base64url.bearer.authorization.k8s.io.${encodedJwt}`,
      'base64.binary.k8s.io',
    ]);
  });
