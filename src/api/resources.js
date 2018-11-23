import * as application from './resource-application';
import * as applications from './resource-applications';
import * as replicaLog from './resource-replica-log';

import { getJson } from './api-helpers';

// NB: The keys here must match the Redux action prefixes for the resources in
// the /state/{resource}/action-types.js files
export default {
  APP: application,
  APPS: applications,
  REPLICA_LOG: replicaLog,
};

export const subscribe = async resourceUrl => {
  // TODO: replace with socket.io message dispatch
  return await getJson(resourceUrl, 'radix_api');
};

export const unsubscribe = resourceUrl => {
  // TODO: replace with socket.io message dispatch
  return; // noop in REST model
};
