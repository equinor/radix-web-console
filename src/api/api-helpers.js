import merge from 'lodash/merge';

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
const fetchAuth = async (url, options, resource) => {
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

// --- websocket requests ------------------------------------------------------

/**
 *
 * @see https://github.com/kubernetes/kubernetes/pull/47740
 * @param {string} path Relative path
 * @param {string} resource Resource key, as defined in `api-config.js`
 * @param {bool} [watchParam] Whether to add `?watch=true` to the request (if
 *    watching a single resource then the watch operation is part of
 *    the URL, e.g. /api/v1/watch/namespaces/ns/secrets/secret-name). For list
 *    watching, the param should be included. Otherwise, the `/watch/` operation
 *    is prepended to the URL.
 */
export async function openAuthenticatedWs(path, resource, watchParam = true) {
  // The websocket can be recreated at any time, but its arguments,
  // (specifically the auth token) might need to change. For that we need to
  // call authorize(). We create a function that returns the arguments for the
  // websocket; this is called on initial setup and when the websocket
  // reconnects.

  const getWsArgs = async () => {
    const accessToken = await authorize(resource);
    let url;

    if (watchParam) {
      const sep = path.indexOf('?') === -1 ? '?' : '&'; // TODO: build paths properly
      url = createUrl(path, resource, 'wss://') + sep + 'watch=true';
    } else {
      url = createUrl(`watch/${path}`, resource, 'wss://');
    }

    // Token must be *unpadded* (i.e. no trailing "=") base64
    const encodedJwt = btoa(accessToken).replace(/=/g, '');

    return [
      url,
      [
        `base64url.bearer.authorization.k8s.io.${encodedJwt}`,
        'base64.binary.k8s.io',
      ],
    ];
  };

  const ws = new ResilientWebSocket(...(await getWsArgs()));
  ws.renewArgs = getWsArgs;
  return ws;
}

export async function subscribeResource(
  resourcePath,
  apiResource,
  watchParam = true
) {
  const socket = await openAuthenticatedWs(
    resourcePath,
    apiResource,
    watchParam
  );

  // TODO: This isn't the most elegant way to offer subscriptions. We are
  // modifying the socket object, which isn't very clean.

  socket.listeners = [];

  socket.onmessage = ev => {
    let message;

    try {
      message = JSON.parse(ev.data);
    } catch (e) {
      console.error('Apps API: cannot parse subscription message', e, ev);
      return;
    }

    socket.listeners.forEach(listener => {
      listener(message);
    });
  };

  /**
   * Register a listener for applications messages
   * @param {function} callback Callback for receiving messages
   * @returns {function} Unsubscriber function; call to remove the listener
   */
  socket.registerListener = callback => {
    const idx = socket.listeners.push(callback) - 1;
    return () => delete socket.listeners[idx]; // Not great; leaves a hole-y array
  };

  return socket;
}

export const subscribeRadixResource = (resourcePath, watchParam = true) =>
  subscribeResource(resourcePath, 'radix_dev_playground_radix', watchParam);

export const subscribeKubernetesResource = (resourcePath, watchParam = true) =>
  subscribeResource(resourcePath, 'radix_dev_playground_k8s', watchParam);

export const subscribeBatchResource = (resourcePath, watchParam = true) =>
  subscribeResource(resourcePath, 'radix_dev_playground_batch', watchParam);
