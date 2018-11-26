import actionTypes from './action-types';
import apiResources from '../../api/resources';
import { makeActionCreator } from '../state-utils/action-creators';

export const subscribe = resource => ({
  resource,
  type: actionTypes.SUBSCRIBE,
});

export const subscriptionsRefreshRequest = makeActionCreator(
  actionTypes.SUBSCRIPTIONS_REFRESH_REQUEST
);

export const subscriptionsRefreshComplete = makeActionCreator(
  actionTypes.SUBSCRIPTIONS_REFRESH_COMPLETE
);

export const unsubscribe = resource => ({
  resource,
  type: actionTypes.UNSUBSCRIBE,
});

const makeResourceSubscriber = resourceName => (...args) =>
  subscribe(apiResources[resourceName].makeUrl(...args));

const makeResourceUnsubscriber = resourceName => (...args) =>
  unsubscribe(apiResources[resourceName].makeUrl(...args));

// -- Application --------------------------------------------------------------

export const subscribeApplication = makeResourceSubscriber('APP');
export const unsubscribeApplication = makeResourceUnsubscriber('APP');

// -- Applications -------------------------------------------------------------

export const subscribeApplications = makeResourceSubscriber('APPS');
export const unsubscribeApplications = makeResourceUnsubscriber('APPS');

// -- Deployments --------------------------------------------------------------

export const subscribeDeployments = makeResourceSubscriber('DEPLOYMENTS');
export const unsubscribeDeployments = makeResourceUnsubscriber('DEPLOYMENTS');
