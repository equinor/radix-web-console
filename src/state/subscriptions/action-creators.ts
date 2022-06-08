import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from './action-types';

import { makeActionCreator } from '../state-utils/action-creators';
import { apiResources } from '../../api/resources';

export const subscribe = makeActionCreator<never, SubscriptionsActionMeta>(
  SubscriptionsActionTypes.SUBSCRIBE,
  'resource',
  'messageType'
);

export const subscriptionEnded = makeActionCreator<
  never,
  SubscriptionsActionMeta
>(SubscriptionsActionTypes.SUBSCRIPTION_ENDED, 'resource', 'resourceName');

export const subscriptionSucceeded = makeActionCreator<
  never,
  SubscriptionsActionMeta
>(SubscriptionsActionTypes.SUBSCRIPTION_SUCCEEDED, 'resource');

export const subscriptionFailed = makeActionCreator<
  never,
  SubscriptionsActionMeta
>(SubscriptionsActionTypes.SUBSCRIPTION_FAILED, 'resource', 'error');

export const subscriptionLoaded = makeActionCreator<
  never,
  SubscriptionsActionMeta
>(SubscriptionsActionTypes.SUBSCRIPTION_LOADED, 'resource');

export const subscriptionLoading = makeActionCreator<
  never,
  SubscriptionsActionMeta
>(SubscriptionsActionTypes.SUBSCRIPTION_LOADING, 'resource');

export const unsubscribe = makeActionCreator<never, SubscriptionsActionMeta>(
  SubscriptionsActionTypes.UNSUBSCRIBE,
  'resource',
  'resourceName'
);

export const refreshSubscription = makeActionCreator<
  never,
  SubscriptionsActionMeta
>(SubscriptionsActionTypes.REFRESH_SUBSCRIPTION, 'resource', 'resourceName');

// TODO: Consider reorganising resource files in /api to be proper objects
// with an interface that can specify things like message type

const makeResourceSubscriber =
  (resourceName: string, messageType: string = 'json') =>
  (...args: Array<string>) =>
    subscribe(apiResources[resourceName].makeUrl(...args), messageType);

const makeResourceUnsubscriber =
  (resourceName: string) =>
  (...args: Array<string>) =>
    unsubscribe(apiResources[resourceName].makeUrl(...args), resourceName);

const makeResourceSubscriberRefresh =
  (resourceName: string, messageType: string = 'json') =>
  (...args: Array<string>) =>
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

// -- Pipeline Runs -----------------------------------------------------------------

export const subscribePipelineRuns = makeResourceSubscriber('PIPELINE_RUNS');
export const unsubscribePipelineRuns =
  makeResourceUnsubscriber('PIPELINE_RUNS');

// -- Pipeline Run -----------------------------------------------------------------

export const subscribePipelineRun = makeResourceSubscriber('PIPELINE_RUN');
export const unsubscribePipelineRun = makeResourceUnsubscriber('PIPELINE_RUN');

// -- Pipeline Run Tasks -----------------------------------------------------------------

export const subscribePipelineRunTasks =
  makeResourceSubscriber('PIPELINE_RUN_TASKS');
export const unsubscribePipelineRunTasks =
  makeResourceUnsubscriber('PIPELINE_RUN_TASKS');

// -- Pipeline Run Task -----------------------------------------------------------------

export const subscribePipelineRunTask =
  makeResourceSubscriber('PIPELINE_RUN_TASK');
export const unsubscribePipelineRunTask =
  makeResourceUnsubscriber('PIPELINE_RUN_TASK');

// -- Pipeline Run Task Steps -----------------------------------------------------------------

export const subscribePipelineRunTaskSteps = makeResourceSubscriber(
  'PIPELINE_RUN_TASK_STEPS'
);
export const unsubscribePipelineRunTaskSteps = makeResourceUnsubscriber(
  'PIPELINE_RUN_TASK_STEPS'
);

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