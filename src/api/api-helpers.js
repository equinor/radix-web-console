import { getResource } from './api-config';
import { authorize } from './auth';
import { NetworkException } from '../utils/exception';

/**
 * Create a full URL to a remote resource
 * @param {string} path Relative path
 * @param {string} [resource] Resource key, as defined in `api-config.js`
 */
export const createUrl = (path, resource) =>
  `${getResource(resource).baseUrl}${path}`;

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
 */
const fetchJson = (url, options, resource) =>
  authorize(resource).then(r =>
    fetch(url, {
      ...options,
      ...jsonHeaders,
      Authorization: `Bearer ${r.accessToken}`,
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
  fetchJson(createUrl(resource, path), { method: 'GET' }, resource);

/**
 * POST JSON to remote resource
 * @param {string} path Relative path
 * @param {object} data Key/values map to post as JSON
 * @param {string} [resource] Resource key, as defined in `api-config.js`
 */
export const postJson = (path, data, resource) =>
  fetchJson(
    createUrl(resource, path),
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    resource
  );
