import * as application from './resource-application';
import * as applications from './resource-applications';
import * as deployment from './resource-deployment';
import * as deployments from './resource-deployments';
import * as environments from './resource-environment';
import * as environmentVariables from './resource-environment-variables';
import * as job from './resource-job';
import * as jobLogs from './resource-job-logs';
import * as jobs from './resource-jobs';
import * as events from './resource-events';

import { getJson, getText } from './api-helpers';


// NB: The keys here must match the Redux action prefixes for the resources in
// the /state/{resource}/action-types.js files
export const apiResources = {
  APP: application,
  APPS: applications,
  DEPLOYMENT: deployment,
  DEPLOYMENTS: deployments,
  ENVIRONMENT: environments,
  ENVVARS: environmentVariables,
  JOB_LOGS: jobLogs,
  JOB: job,
  JOBS: jobs,
  EVENTS: events,
};

export const subscribe = async (resourceUrl, type = 'json') => {
  if (type === 'json') {
    return await getJson(resourceUrl);
  } else {
    return await getText(resourceUrl);
  }
};

export const unsubscribe = (resourceUrl) => {
  return; // noop in REST model
};

export default apiResources;
