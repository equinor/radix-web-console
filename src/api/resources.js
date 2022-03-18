import * as application from './resource-application';
import * as applications from './resource-applications';
import * as deployment from './resource-deployment';
import * as deployments from './resource-deployments';
import * as environments from './resource-environment';
import * as environmentScheduledJobs from './resource-environment-scheduled-jobs';
import * as environmentScheduledBatches from './resource-environment-scheduled-batches';
import * as job from './resource-job';
import * as jobLogs from './resource-job-logs';
import * as jobs from './resource-jobs';
import * as events from './resource-events';
import * as environmentAlerting from './resource-environment-alerting';
import * as applicationAlerting from './resource-application-alerting';

import { getJson, getText } from './api-helpers';

// NB: The keys here must match the Redux action prefixes for the resources in
// the /state/{resource}/action-types.js files
export const apiResources = {
  APP: application,
  APPS: applications,
  DEPLOYMENT: deployment,
  DEPLOYMENTS: deployments,
  ENVIRONMENT: environments,
  ENVIRONMENT_SCHEDULED_JOBS: environmentScheduledJobs,
  ENVIRONMENT_SCHEDULED_BATCHES: environmentScheduledBatches,
  JOB_LOGS: jobLogs,
  JOB: job,
  JOBS: jobs,
  EVENTS: events,
  ENVIRONMENT_ALERTING: environmentAlerting,
  APPLICATION_ALERTING: applicationAlerting,
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
