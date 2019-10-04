import * as application from './resource-application';
import * as applications from './resource-applications';
import * as deployment from './resource-deployment';
import * as deployments from './resource-deployments';
import * as environments from './resource-environment';
import * as job from './resource-job';
import * as jobLogs from './resource-job-logs';
import * as jobs from './resource-jobs';
import * as replicaLog from './resource-replica-log';

import { getJson, getText } from './api-helpers';

// NB: The keys here must match the Redux action prefixes for the resources in
// the /state/{resource}/action-types.js files
export default {
  APP: application,
  APPS: applications,
  DEPLOYMENT: deployment,
  DEPLOYMENTS: deployments,
  ENVIRONMENT: environments,
  JOB_LOGS: jobLogs,
  JOB: job,
  JOBS: jobs,
  REPLICA_LOG: replicaLog,
};

export const subscribe = async (resourceUrl, type = 'json') => {
  // TODO: replace with socket.io message dispatch

  if (type === 'json') {
    return await getJson(resourceUrl, 'radix_api');
  } else {
    return await getText(resourceUrl, 'radix_api');
  }
};

export const unsubscribe = resourceUrl => {
  // TODO: replace with socket.io message dispatch
  return; // noop in REST model
};
