import * as application from './resource-application';
import * as applications from './resource-applications';
import * as deployments from './resource-deployments';
import * as job from './resource-job';
import * as jobLogs from './resource-job-logs';
import * as replicaLog from './resource-replica-log';

import { getJson, getText } from './api-helpers';

// NB: The keys here must match the Redux action prefixes for the resources in
// the /state/{resource}/action-types.js files
export default {
  APP: application,
  APPS: applications,
  DEPLOYMENTS: deployments,
  JOB_LOGS: jobLogs,
  JOB: job,
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
