/* eslint-disable prettier/prettier */
import { createRadixApiUrl } from './api-config';
import { getJson, getText } from './api-helpers';

import { routeWithParams } from '../utils/string';

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
  A extends Array<string | number | boolean | void> = Array<void>
>(
  route: string
): {
  makeUrl: (...args: A) => string;
  urlMatches: (resource: string) => boolean;
} {
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
        makeUrl: (...args: A) =>
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
  APP: generateApiResource<[appName: string]>(
    '/applications/:appName'
  ),
  APPS: generateApiResource<[]>(
    '/applications'
  ),
  DEPLOYMENT: generateApiResource<[appName: string, deploymentName: string]>(
    '/applications/:appName/deployments/:deploymentName'
  ),
  DEPLOYMENTS: generateApiResource<[appName: string]>(
    '/applications/:appName/deployments'
  ),
  APPLICATION_ALERTING: generateApiResource<[appName: string]>(
    '/applications/:appName/alerting'
  ),
  ENVIRONMENT_ALERTING: generateApiResource<[appName: string, envName: string]>(
    '/applications/:appName/environments/:envName/alerting'
  ),
  ENVIRONMENT_SCHEDULED_BATCH: generateApiResource<[appName: string, envName: string, jobComponentName: string, batchName: string]>(
    '/applications/:appName/environments/:envName/jobcomponents/:jobComponentName/batches/:batchName'
  ),
  ENVIRONMENT_SCHEDULED_BATCHES: generateApiResource<[appName: string, envName: string, jobComponentName: string]>(
    '/applications/:appName/environments/:envName/jobcomponents/:jobComponentName/batches'
  ),
  ENVIRONMENT_SCHEDULED_JOB: generateApiResource<[appName: string, envName: string, jobComponentName: string, jobName: string]>(
    '/applications/:appName/environments/:envName/jobcomponents/:jobComponentName/jobs/:jobName'
  ),
  ENVIRONMENT_SCHEDULED_JOBS: generateApiResource<[appName: string, envName: string, jobComponentName: string]>(
    '/applications/:appName/environments/:envName/jobcomponents/:jobComponentName/jobs'
  ),
  ENVIRONMENT: generateApiResource<[appName: string, envName: string]>(
    `/applications/:appName/environments/:envName`
  ),
  EVENTS: generateApiResource<[appName: string, envName: string]>(
    '/applications/:appName/environments/:envName/events'
  ),
  JOB: generateApiResource<[appName: string, jobName: string]>(
    '/applications/:appName/jobs/:jobName'
  ),
  JOBS: generateApiResource<[appName: string]>(
    '/applications/:appName/jobs'
  ),
  PIPELINE_RUN_TASK_STEPS: generateApiResource<[appName: string, jobName: string, pipelineRunName: string, taskName: string]>(
    '/applications/:appName/jobs/:jobName/pipelineruns/:pipelineRunName/tasks/:taskName/steps'
  ),
  PIPELINE_RUN_TASK: generateApiResource<[appName: string, jobName: string, pipelineRunName: string, taskName: string]>(
    '/applications/:appName/jobs/:jobName/pipelineruns/:pipelineRunName/tasks/:taskName'
  ),
  PIPELINE_RUN_TASKS: generateApiResource<[appName: string, jobName: string, pipelineRunName: string]>(
    '/applications/:appName/jobs/:jobName/pipelineruns/:pipelineRunName/tasks'
  ),
  PIPELINE_RUN: generateApiResource<[appName: string, jobName: string, pipelineRunName: string]>(
    '/applications/:appName/jobs/:jobName/pipelineruns/:pipelineRunName'
  ),
  PIPELINE_RUNS: generateApiResource<[appName: string, jobName: string]>(
    '/applications/:appName/jobs/:jobName/pipelineruns'
  ),
};

export async function subscribe(
  resourceUrl: string,
  type: 'json' | 'text' = 'json'
): Promise<unknown> {
  return type === 'json'
    ? await getJson(createRadixApiUrl(resourceUrl))
    : await getText(createRadixApiUrl(resourceUrl));
}

export function unsubscribe(resourceUrl: string): void {
  return; // noop in REST model
}
