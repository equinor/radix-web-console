import { getResource } from './api-config';
import { authorize } from './auth';
import { NetworkException } from '../utils/exception';

/**
 * Headers to add to all JSON requests
 */
const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

/**
 * Create a full URL to a remote resource
 * @param {string} path Relative path
 * @param {string} [resource] Resource key, as defined in `api-config.js`
 */
export const createUrl = (path, resource) =>
  `${getResource(resource).baseUrl}${path}`;

/**
 * Fetch JSON from remote resource
 * @param {string} path Relative path
 * @param {string} [resource] Resource key, as defined in `api-config.js`
 */
export const getJson = (path, resource) =>
  authorize(resource).then(r =>
    fetch(createUrl(resource, path), {
      method: 'GET',
      withCredentials: true,
      headers: {
        ...jsonHeaders,
        Authorization: `Bearer ${r.accessToken}`,
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new NetworkException(response.statusText, response.status);
    })
  );

/**
 * Post JSON to remote resource
 * @param {string} path Relative path
 * @param {object} data Key/values map to post as JSON
 * @param {string} [resource] Resource key, as defined in `api-config.js`
 */
export const postJson = (path, data, resource) =>
  authorize(resource).then(r =>
    fetch(createUrl(resource, path), {
      method: 'POST',
      body: JSON.stringify(data),
      withCredentials: true,
      headers: {
        ...jsonHeaders,
        Authorization: `Bearer ${r.accessToken}`,
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new NetworkException(response.statusText, response.status);
    })
  );
