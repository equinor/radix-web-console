import { merge } from 'lodash';
import { Observable, of } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';

import { apiBaseUri } from './api-config';

import { AsyncState } from '../effects/effect-types';
import { RequestState } from '../state/state-utils/request-states';
import { NetworkException } from '../utils/exception';

const AUTH_RETRY_INTERVAL: number = 3000;

/**
 * Create a full URL to the API
 * @param {string} path Relative path
 * @param {string} [protocol] Protocol to use, e.g. 'wss:'
 */
export function createApiUrl(
  path: string,
  protocol: string = window.location.protocol
): string {
  return `${protocol}//${apiBaseUri}${path}`;
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

// --- Plaintext requests ------------------------------------------------------

/**
 * Fetch plaintext requests
 * @param {string} url Full URL to fetch
 * @param {object} options Options for fetch()
 * @returns {Promise<string>}
 */
async function fetchPlain(
  url: RequestInfo | URL,
  options: RequestInit
): Promise<string> {
  const response = await radixFetch(url, options);
  return await response.text();
}

/**
 * GET plaintext from remote resource
 * @param {string} path Relative path
 */
export function getText(path: string): Promise<string> {
  return fetchPlain(createApiUrl(path), { method: 'GET' });
}

/**
 * DELETE remote resource
 * @param {string} path Relative path
 */
export async function deleteRequest(path: string): Promise<string> {
  return fetchPlain(createApiUrl(path), { method: 'DELETE' });
}

/**
 * POST action
 * @param {string} path Relative path
 */
export async function postRequest(path: string): Promise<string> {
  return fetchPlain(createApiUrl(path), { method: 'POST' });
}

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
async function fetchJson<T>(
  url: RequestInfo | URL,
  options: RequestInit
): Promise<T> {
  const jsonOptions = merge<RequestInit, RequestInit>(
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
 * Create a request generator function without request body support
 * @param {string} method HTTP method
 * @returns {JsonFetcher}
 */
function makeJsonRequester(method: string) {
  return function <T>(path: string): Promise<T> {
    return fetchJson<T>(createApiUrl(path), { method });
  };
}

/**
 * Create a request generator function with request body support
 * @param {string} method HTTP method
 * @returns {JsonFetcherWithBody}
 */
function makeJsonRequesterWithBody(method: string) {
  return function <T>(path: string, data: unknown): Promise<T> {
    return fetchJson<T>(createApiUrl(path), {
      method,
      body: JSON.stringify(data),
    });
  };
}

/**
 * GET JSON from remote resource
 * @function
 * @type {JsonFetcher}
 */
export const getJson: <T>(path: string) => Promise<T> =
  makeJsonRequester('GET');

/**
 * DELETE remote resource; expect JSON response
 * @function
 * @type {JsonFetcher}
 */
export const deleteJson: <T>(path: string) => Promise<T> =
  makeJsonRequester('DELETE');

/**
 * POST JSON to remote resource with no body
 * @function
 * @type {JsonFetcher}
 */
export const postJsonWithNoBody: <T>(path: string) => Promise<T> =
  makeJsonRequester('POST');

/**
 * POST JSON to remote resource
 * @function
 * @type {JsonFetcherWithBody}
 */
export const postJson: <T>(path: string, data: unknown) => Promise<T> =
  makeJsonRequesterWithBody('POST');

/**
 * PUT JSON to remote resource
 * @function
 * @type {JsonFetcherWithBody}
 */
export const putJson: <T>(path: string, data: unknown) => Promise<T> =
  makeJsonRequesterWithBody('PUT');

/**
 * PATCH JSON to remote resource
 * @function
 * @type {JsonFetcherWithBody}
 */
export const patchJson: <T>(path: string, data: unknown) => Promise<T> =
  makeJsonRequesterWithBody('PATCH');

// --- AJAX JSON requests ------------------------------------------------------

function ajaxRequest<T>(
  request$: Observable<AjaxResponse<T>>
): Observable<AsyncState<T>> {
  return request$.pipe(
    map((response) => ({
      data: response.response,
      status: RequestState.SUCCESS,
    })),
    catchError((err) => {
      return of<AsyncState<T>>({
        status: RequestState.FAILURE,
        data: null,
        error: err.message,
      });
    })
  );
}

export function ajaxGet<T>(
  path: string,
  contentType = 'application/json'
): Observable<AsyncState<T>> {
  const headers: Record<string, string> = { 'Content-Type': contentType };
  return ajaxRequest(ajax.get<T>(path, headers));
}

export function ajaxPost<T>(
  path: string,
  body: unknown,
  contentType = 'application/json'
): Observable<AsyncState<T>> {
  const headers: Record<string, string> = { 'Content-Type': contentType };
  return ajaxRequest(ajax.post<T>(path, body, headers));
}
