import { createRadixApiUrl } from './api-config';
import { getJson, getText } from './api-helpers';

import { routeWithParams } from '../utils/string';

export type ApiResourceKey = keyof typeof apiResources;
export type ApiMessageType = 'json' | 'text';

export type ApiResource<
  Args extends Array<string | number | boolean | void | unknown>,
> = {
  makeUrl: (...args: Args) => string;
  urlMatches: (resource: string) => boolean;
};
export type ApiResourceParams<K extends ApiResourceKey> = Parameters<
  (typeof apiResources)[K]['makeUrl']
>;

/**
 * Boilerplate for generating ApiResources
 *
 * @param route API route, including optional colon-prefixed (:) variable names
 *
 * @example
 * {
 *   const resource = generateApiResource<[appName: string]>(
 *     '/applications/:appName'
 *   );
 *   const appUrl = resource.makeUrl('testApp'); // '/applications/testApp'
 * }
 */
function generateApiResource<
  Args extends Array<string | number | boolean | void> = Array<void>,
>(route: string): ApiResource<Args> {
  const keys = route.split(/:(\w+)/g).filter((x) => !!x && !x.includes('/'));
  const regexp = new RegExp(
    `^${decodeURIComponent(
      routeWithParams(
        route,
        keys.reduce<Record<string, string>>(
          (obj, key) => ({ ...obj, [key]: '[^/]+' }),
          {}
        )
      )
    )}$`
  );

  return keys.length > 0
    ? {
        makeUrl: (...args: Args) =>
          routeWithParams(
            route,
            args.reduce((obj, x, i) => ({ ...obj, [keys[i]]: x }), {})
          ),
        urlMatches: (resource) => !!resource.match(regexp),
      }
    : {
        makeUrl: () => route,
        urlMatches: (resource) => resource === route,
      };
}

// NB: The keys here must match the Redux action prefixes for the resources in
// the /state/{resource}/action-types.js files
export const apiResources = {
  APP: generateApiResource<[appName: string]>('/applications/:appName'),
  DEPLOYMENTS: generateApiResource<[appName: string]>(
    '/applications/:appName/deployments'
  ),
  JOB: generateApiResource<[appName: string, jobName: string]>(
    '/applications/:appName/jobs/:jobName'
  ),
};

export async function subscribe<
  P extends ApiMessageType,
  T extends P extends 'json' ? unknown : string,
>(resourceUrl: string, type: P): Promise<T> {
  return (await (type === 'json' ? getJson : getText)(
    createRadixApiUrl(resourceUrl)
  )) as T;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function unsubscribe(resourceUrl: string): void {
  return; // noop in REST model
}
