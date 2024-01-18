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
