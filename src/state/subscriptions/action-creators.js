import actionTypes from './action-types';
import apiResources from '../../api/resources';
import { makeActionCreator } from '../state-utils/action-creators';

export const subscribe = (resource, messageType) => ({
  resource,
  messageType,
  type: actionTypes.SUBSCRIBE,
});

export const subscriptionsRefreshRequest = makeActionCreator(
  actionTypes.SUBSCRIPTIONS_REFRESH_REQUEST
);

export const subscriptionsRefreshComplete = makeActionCreator(
  actionTypes.SUBSCRIPTIONS_REFRESH_COMPLETE
);

export const unsubscribe = (resource, resourceName) => ({
  resource,
  resourceName,
  type: actionTypes.UNSUBSCRIBE,
});

// TODO: Consider reorganising resource files in /api to be proper objects
// with an interface that can specify things like message type

const makeResourceSubscriber = (resourceName, messageType = 'json') => (
  ...args
) => subscribe(apiResources[resourceName].makeUrl(...args), messageType);

const makeResourceUnsubscriber = resourceName => (...args) =>
  unsubscribe(apiResources[resourceName].makeUrl(...args), resourceName);

// TODO: Consider moving these action creators into the appropriate
// src/state/{resource}/action-creators.js files

// -- Application --------------------------------------------------------------

export const subscribeApplication = makeResourceSubscriber('APP');
export const unsubscribeApplication = makeResourceUnsubscriber('APP');

// -- Applications -------------------------------------------------------------

export const subscribeApplications = makeResourceSubscriber('APPS');
export const unsubscribeApplications = makeResourceUnsubscriber('APPS');

// -- Deployments --------------------------------------------------------------

export const subscribeDeployments = makeResourceSubscriber('DEPLOYMENTS');
export const unsubscribeDeployments = makeResourceUnsubscriber('DEPLOYMENTS');

// -- Job ----------------------------------------------------------------------

export const subscribeJob = makeResourceSubscriber('JOB');
export const unsubscribeJob = makeResourceUnsubscriber('JOB');

// -- Job logs -----------------------------------------------------------------

export const subscribeJobLogs = makeResourceSubscriber('JOB_LOGS');
export const unsubscribeJobLogs = makeResourceUnsubscriber('JOB_LOGS');

// -- Replica logs -------------------------------------------------------------

export const subscribeReplicaLog = makeResourceSubscriber(
  'REPLICA_LOG',
  'text'
);
export const unsubscribeReplicaLog = makeResourceUnsubscriber('REPLICA_LOG');
