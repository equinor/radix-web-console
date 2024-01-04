import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from './action-types';

import { makeActionCreator } from '../state-utils/action-creators';
import {
  ApiMessageType,
  ApiResourceKey,
  ApiResourceParams,
  apiResources,
} from '../../api/resources';

export const subscribe = makeActionCreator<
  never,
  SubscriptionsActionMeta,
  [resource: string, messageType?: string]
>(SubscriptionsActionTypes.SUBSCRIBE, 'resource', 'messageType');

export const subscriptionEnded = makeActionCreator<
  never,
  SubscriptionsActionMeta,
  [resource: string, resourceName: string]
>(SubscriptionsActionTypes.SUBSCRIPTION_ENDED, 'resource', 'resourceName');

export const subscriptionSucceeded = makeActionCreator<
  never,
  SubscriptionsActionMeta,
  [resource: string]
>(SubscriptionsActionTypes.SUBSCRIPTION_SUCCEEDED, 'resource');

export const subscriptionFailed = makeActionCreator<
  never,
  SubscriptionsActionMeta,
  [resource: string, error: string, code: number]
>(SubscriptionsActionTypes.SUBSCRIPTION_FAILED, 'resource', 'error', 'code');

export const subscriptionLoaded = makeActionCreator<
  never,
  SubscriptionsActionMeta,
  [resource: string]
>(SubscriptionsActionTypes.SUBSCRIPTION_LOADED, 'resource');

export const subscriptionLoading = makeActionCreator<
  never,
  SubscriptionsActionMeta,
  [resource: string]
>(SubscriptionsActionTypes.SUBSCRIPTION_LOADING, 'resource');

export const unsubscribe = makeActionCreator<
  never,
  SubscriptionsActionMeta,
  [resource: string]
>(SubscriptionsActionTypes.UNSUBSCRIBE, 'resource');

export const refreshSubscription = makeActionCreator<
  never,
  SubscriptionsActionMeta,
  [resource: string]
>(SubscriptionsActionTypes.REFRESH_SUBSCRIPTION, 'resource');

// TODO: Consider reorganising resource files in /api to be proper objects
// with an interface that can specify things like message type

const makeResourceSubscriber =
  <K extends ApiResourceKey>(
    resourceName: K,
    messageType: ApiMessageType = 'json'
  ) =>
  (...args: ApiResourceParams<K>) =>
    subscribe(
      apiResources[resourceName as string].makeUrl(...args),
      messageType
    );

const makeResourceUnsubscriber =
  <K extends ApiResourceKey>(resourceName: K) =>
  (...args: ApiResourceParams<K>) =>
    unsubscribe(apiResources[resourceName as string].makeUrl(...args));

const makeResourceSubscriberRefresh =
  <K extends ApiResourceKey>(resourceName: K) =>
  (...args: ApiResourceParams<K>) =>
    refreshSubscription(apiResources[resourceName as string].makeUrl(...args));

// TODO: Consider moving these action creators into the appropriate
// src/state/{resource}/action-creators.js files

// -- Application --------------------------------------------------------------

export const subscribeApplication = makeResourceSubscriber('APP');
export const unsubscribeApplication = makeResourceUnsubscriber('APP');

export const refreshApp = makeResourceSubscriberRefresh('APP');

// -- Deployments --------------------------------------------------------------

export const subscribeDeployments = makeResourceSubscriber('DEPLOYMENTS');
export const unsubscribeDeployments = makeResourceUnsubscriber('DEPLOYMENTS');

// -- Job ----------------------------------------------------------------------

export const subscribeJob = makeResourceSubscriber('JOB');
export const unsubscribeJob = makeResourceUnsubscriber('JOB');

// -- Pipeline Runs ------------------------------------------------------------

export const subscribePipelineRuns = makeResourceSubscriber('PIPELINE_RUNS');
export const unsubscribePipelineRuns =
  makeResourceUnsubscriber('PIPELINE_RUNS');

// -- Pipeline Run -------------------------------------------------------------

export const subscribePipelineRun = makeResourceSubscriber('PIPELINE_RUN');
export const unsubscribePipelineRun = makeResourceUnsubscriber('PIPELINE_RUN');

// -- Pipeline Run Tasks -------------------------------------------------------

export const subscribePipelineRunTasks =
  makeResourceSubscriber('PIPELINE_RUN_TASKS');
export const unsubscribePipelineRunTasks =
  makeResourceUnsubscriber('PIPELINE_RUN_TASKS');

// -- Pipeline Run Task --------------------------------------------------------

export const subscribePipelineRunTask =
  makeResourceSubscriber('PIPELINE_RUN_TASK');
export const unsubscribePipelineRunTask =
  makeResourceUnsubscriber('PIPELINE_RUN_TASK');

// -- Pipeline Run Task Steps --------------------------------------------------

export const subscribePipelineRunTaskSteps = makeResourceSubscriber(
  'PIPELINE_RUN_TASK_STEPS'
);
export const unsubscribePipelineRunTaskSteps = makeResourceUnsubscriber(
  'PIPELINE_RUN_TASK_STEPS'
);

// -- Environment Alerting -----------------------------------------------------

export const subscribeEnvironmentAlerting = makeResourceSubscriber(
  'ENVIRONMENT_ALERTING'
);
export const unsubscribeEnvironmentAlerting = makeResourceUnsubscriber(
  'ENVIRONMENT_ALERTING'
);

// -- Environment Alerting -----------------------------------------------------

export const subscribeApplicationAlerting = makeResourceSubscriber(
  'APPLICATION_ALERTING'
);
export const unsubscribeApplicationAlerting = makeResourceUnsubscriber(
  'APPLICATION_ALERTING'
);
