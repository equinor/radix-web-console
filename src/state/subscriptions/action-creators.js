import { SubscriptionsActionTypes } from './action-types';

import { apiResources } from '../../api/resources';
import { makeActionCreator } from '../state-utils/action-creators';

export const subscribe = makeActionCreator(
  SubscriptionsActionTypes.SUBSCRIBE,
  'resource',
  'messageType'
);

export const subscriptionEnded = makeActionCreator(
  SubscriptionsActionTypes.SUBSCRIPTION_ENDED,
  'resource',
  'resourceName'
);

export const subscriptionSucceeded = makeActionCreator(
  SubscriptionsActionTypes.SUBSCRIPTION_SUCCEEDED,
  'resource'
);

export const subscriptionFailed = makeActionCreator(
  SubscriptionsActionTypes.SUBSCRIPTION_FAILED,
  'resource',
  'error'
);

export const subscriptionLoaded = makeActionCreator(
  SubscriptionsActionTypes.SUBSCRIPTION_LOADED,
  'resource'
);

export const subscriptionLoading = makeActionCreator(
  SubscriptionsActionTypes.SUBSCRIPTION_LOADING,
  'resource'
);

export const unsubscribe = makeActionCreator(
  SubscriptionsActionTypes.UNSUBSCRIBE,
  'resource',
  'resourceName'
);

export const refreshSubscription = makeActionCreator(
  SubscriptionsActionTypes.REFRESH_SUBSCRIPTION,
  'resource',
  'resourceName'
);

// TODO: Consider reorganising resource files in /api to be proper objects
// with an interface that can specify things like message type

const makeResourceSubscriber =
  (resourceName, messageType = 'json') =>
  (...args) =>
    subscribe(apiResources[resourceName].makeUrl(...args), messageType);

const makeResourceUnsubscriber =
  (resourceName) =>
  (...args) =>
    unsubscribe(apiResources[resourceName].makeUrl(...args), resourceName);

const makeResourceSubscriberRefresh =
  (resourceName, messageType = 'json') =>
  (...args) =>
    refreshSubscription(
      apiResources[resourceName].makeUrl(...args),
      messageType
    );

// TODO: Consider moving these action creators into the appropriate
// src/state/{resource}/action-creators.js files

// -- Application --------------------------------------------------------------

export const subscribeApplication = makeResourceSubscriber('APP');
export const unsubscribeApplication = makeResourceUnsubscriber('APP');

export const refreshApp = makeResourceSubscriberRefresh('APP');

// -- Applications -------------------------------------------------------------

export const subscribeApplications = makeResourceSubscriber('APPS');
export const unsubscribeApplications = makeResourceUnsubscriber('APPS');

// -- Deployment ---------------------------------------------------------------

export const subscribeDeployment = makeResourceSubscriber('DEPLOYMENT');
export const unsubscribeDeployment = makeResourceUnsubscriber('DEPLOYMENT');

// -- Deployments --------------------------------------------------------------

export const subscribeDeployments = makeResourceSubscriber('DEPLOYMENTS');
export const unsubscribeDeployments = makeResourceUnsubscriber('DEPLOYMENTS');

// -- Environment --------------------------------------------------------------

export const subscribeEnvironment = makeResourceSubscriber('ENVIRONMENT');
export const unsubscribeEnvironment = makeResourceUnsubscriber('ENVIRONMENT');

export const refreshEnvironment = makeResourceSubscriberRefresh('ENVIRONMENT');

// -- Environment scheduled jobs --------------------------------------------------------------

export const subscribeEnvironmentScheduledJobs = makeResourceSubscriber(
  'ENVIRONMENT_SCHEDULED_JOBS'
);
export const unsubscribeEnvironmentScheduledJobs = makeResourceUnsubscriber(
  'ENVIRONMENT_SCHEDULED_JOBS'
);

// -- Environment scheduled batches --------------------------------------------------------------

export const subscribeEnvironmentScheduledBatches = makeResourceSubscriber(
  'ENVIRONMENT_SCHEDULED_BATCHES'
);
export const unsubscribeEnvironmentScheduledBatches = makeResourceUnsubscriber(
  'ENVIRONMENT_SCHEDULED_BATCHES'
);

// -- Job ----------------------------------------------------------------------

export const subscribeJob = makeResourceSubscriber('JOB');
export const unsubscribeJob = makeResourceUnsubscriber('JOB');

// -- Jobs ---------------------------------------------------------------------

export const subscribeJobs = makeResourceSubscriber('JOBS');
export const unsubscribeJobs = makeResourceUnsubscriber('JOBS');

// -- Job logs -----------------------------------------------------------------

export const subscribeJobLogs = makeResourceSubscriber('JOB_LOGS');
export const unsubscribeJobLogs = makeResourceUnsubscriber('JOB_LOGS');

// -- Events -------------------------------------------------------------------

export const subscribeEvents = makeResourceSubscriber('EVENTS');
export const unsubscribeEvents = makeResourceUnsubscriber('EVENTS');

// -- Environment Alerting -------------------------------------------------------------------

export const subscribeEnvironmentAlerting = makeResourceSubscriber(
  'ENVIRONMENT_ALERTING'
);
export const unsubscribeEnvironmentAlerting = makeResourceUnsubscriber(
  'ENVIRONMENT_ALERTING'
);

// -- Environment Alerting -------------------------------------------------------------------

export const subscribeApplicationAlerting = makeResourceSubscriber(
  'APPLICATION_ALERTING'
);
export const unsubscribeApplicationAlerting = makeResourceUnsubscriber(
  'APPLICATION_ALERTING'
);
