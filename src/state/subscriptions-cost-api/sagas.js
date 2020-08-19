import {
  all,
  call,
  cancel,
  delay,
  fork,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import get from 'lodash/get';
import set from 'lodash/set';

import * as actionCreators from './action-creators';
import actionTypes from './action-types';
import apiResources, { subscribe, unsubscribe } from '../../cost-api/resources';
/**
 * Amount of time (in ms) to keep in memory resources that have no subscribers.
 * This avoids quick unsubscribe/subscribe loops, e.g. when navigation triggers
 * component destruction which calls unsubscribe() but the next page has a
 * component that immediately resubscribes.
 * @todo: This should be configurable per resource
 */
const ZOMBIE_RESOURCE_LIFETIME = 5000;

/**
 * Amount of time (in ms) to wait between refreshes of current subscriptions
 */
const POLLING_INTERVAL = 15000;

/**
 * Keeps track of resources (URLs) that are queued for unsubscription. These
 * resources are grouped per API Resource Name, so that if a resource belonging
 * to the same API Resource is subscribed to, existing resources that are queued
 * for unsubscription are immediately removed.
 */
const unsubscribeQueue = {};

const apiResourceNames = Object.keys(apiResources);

/**
 * @typedef {Object} ApiResource
 * @property {Object} apiResource The actual resource
 * @property {string} apiResourceName The API resource name, e.g. 'APPLICATION'
 */

/**
 * Retrieves the API resource and name
 *
 * @param {string} resource The resource URL
 * @returns {ApiResource} The API resource
 */
function getApiResource(resource) {
  for (const apiResourceName of apiResourceNames) {
    const apiResource = apiResources[apiResourceName];

    let urlMatches = apiResource.urlMatches(resource);
    if (urlMatches) {
      return {
        apiResource,
        apiResourceName,
      };
    }
  }

  console.warn('Cannot map URL to resource subscription', resource);
  return null;
}

/**
 * Fetches a resource and fires the appropriate success action
 * @param {string} resource The resource URL
 */
export function* fetchResource(resource) {
  const { apiResource, apiResourceName } = getApiResource(resource);

  if (apiResource) {
    const resState = yield select(
      (state) => state.subscriptionsCostApi[resource]
    );
    let response;

    try {
      response = yield call(subscribe, resource, resState.messageType);
    } catch (err) {
      yield put(actionCreators.subscriptionFailed(resource, err.toString()));
      return false;
    }

    yield put({
      // NB: the action type is generated from the key exported in /src/api/resources.js combined with the type. Since we're using REST, the only action type is '*_SNAPSHOT'
      type: `${apiResourceName}_SNAPSHOT`,
      payload: response,
    });

    return true;
  }

  return false;
}

// -- Watch for subscription/unsubscription ------------------------------------

function* subscribeFlow(action) {
  const { resource } = action;
  const { apiResource, apiResourceName } = getApiResource(resource);

  if (apiResource) {
    const resState = yield select(
      (state) => state.subscriptionsCostApi[resource]
    );

    // Check if we already have subscribed to resource; exit to avoid re-request
    if (resState.subscriberCount !== 1 || resState.hasData) {
      return;
    }

    if (unsubscribeQueue[apiResourceName]) {
      // There are pending unsubscriptions on this API resource; let's expedite them
      const unsubscriptions = Object.keys(unsubscribeQueue[apiResourceName]);

      yield all(
        unsubscriptions.map((unsubResource) =>
          all([
            cancel(unsubscribeQueue[apiResourceName][unsubResource]),
            unsubscribeResource(unsubResource, apiResourceName, true),
          ])
        )
      );
    }

    yield put(actionCreators.subscriptionLoading(resource));

    const success = yield fetchResource(resource);

    if (success) {
      yield put(actionCreators.subscriptionLoaded(resource));
    }
  }
}

function* unsubscribeFlow(action) {
  const { resource } = action;

  for (const apiResourceName of apiResourceNames) {
    const apiResource = apiResources[apiResourceName];

    if (apiResource.urlMatches(resource)) {
      const ongoingUnsubscription = get(
        unsubscribeQueue,
        [apiResourceName, resource],
        false
      );

      if (ongoingUnsubscription) {
        // Already unsubscribing from resource, cancel previous unsubscription to debounce
        yield cancel(ongoingUnsubscription);
      }

      // Add unsubscription to queue; unsubscribeResource will wait a bit before triggering subscriptionEnded() to allow some caching
      set(
        unsubscribeQueue,
        [apiResourceName, resource],
        yield fork(unsubscribeResource, resource, apiResourceName)
      );
      return;
    }
  }
}

function* unsubscribeResource(resource, apiResourceName, immediate = false) {
  if (!immediate) {
    // Don't clear the data immediately in case something else subscribes to it
    yield delay(ZOMBIE_RESOURCE_LIFETIME);
  }

  // Confirm that there are indeed no subscribers, then remove
  const subscriberCount = yield select((state) =>
    get(state.subscriptionsCostApi, [resource, 'subscriberCount'], 0)
  );

  if (subscriberCount === 0) {
    yield all([
      unsubscribe(resource),
      put(actionCreators.subscriptionEnded(resource, apiResourceName)),
    ]);
  }
}

// -- Polling ------------------------------------------------------------------
function handleFailedRequest(resource, err) {
  console.warn('Could not refresh resource', resource, err.toString());
}

function* refreshResource(resource) {
  const currentSubscriptions = yield select(
    (state) => state.subscriptionsCostApi
  );
  if (currentSubscriptions[resource].subscriberCount > 0) {
    yield fetchResource(resource, handleFailedRequest);
  }
}

function* pollSubscriptions() {
  while (true) {
    yield delay(POLLING_INTERVAL);

    const currentSubscriptions = yield select(
      (state) => state.subscriptionsCostApi
    );
    const resources = Object.keys(currentSubscriptions);

    yield all(resources.map((resource) => refreshResource(resource)));
  }
}

// -- Main saga ----------------------------------------------------------------

export default function* watchSubscriptionActions() {
  // Start watcher sagas
  yield takeEvery(actionTypes.SUBSCRIBE_COST_API, subscribeFlow);
  yield takeEvery(actionTypes.UNSUBSCRIBE_COST_API, unsubscribeFlow);
  // Start polling
  yield pollSubscriptions();
}
