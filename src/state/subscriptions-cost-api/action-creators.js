import actionTypes from './action-types';
import apiResources from '../../cost-api/resources';
import { makeActionCreator } from '../state-utils/action-creators';

export const subscribe = makeActionCreator(
  actionTypes.SUBSCRIBE_COST_API,
  'resource',
  'messageType'
);

export const subscriptionEnded = makeActionCreator(
  actionTypes.SUBSCRIPTION_COST_API_ENDED,
  'resource',
  'resourceName'
);

export const subscriptionFailed = makeActionCreator(
  actionTypes.SUBSCRIPTION_COST_API_FAILED,
  'resource',
  'error'
);

export const subscriptionLoaded = makeActionCreator(
  actionTypes.SUBSCRIPTION_COST_API_LOADED,
  'resource'
);

export const subscriptionLoading = makeActionCreator(
  actionTypes.SUBSCRIPTION_COST_API_LOADING,
  'resource'
);

export const unsubscribe = makeActionCreator(
  actionTypes.UNSUBSCRIBE_COST_API,
  'resource',
  'resourceName'
);

// TODO: Consider reorganising resource files in /api to be proper objects
// with an interface that can specify things like message type

const makeResourceSubscriber = (resourceName, messageType = 'json') => (
  ...args
) => subscribe(apiResources[resourceName].makeUrl(...args), messageType);

const makeResourceUnsubscriber = (resourceName) => (...args) =>
  unsubscribe(apiResources[resourceName].makeUrl(...args), resourceName);

// TODO: Consider moving these action creators into the appropriate
// src/state/{resource}/action-creators.js files

// -- Application --------------------------------------------------------------

export const subscribeApplicationCost = makeResourceSubscriber('APP_COST');
export const unsubscribeApplicationCost = makeResourceUnsubscriber('APP_COST');
