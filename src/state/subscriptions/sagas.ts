import { get, set } from 'lodash';
import { Task } from 'redux-saga';
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

import {
  getMemoizedSubscriptions,
  SubscriptionObjectType,
  SubscriptionsStateType,
} from '.';
import {
  subscriptionEnded,
  subscriptionFailed,
  subscriptionLoaded,
  subscriptionLoading,
  subscriptionSucceeded,
} from './action-creators';
import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from './action-types';

import { ActionType } from '../state-utils/action-creators';
import { apiResources, subscribe, unsubscribe } from '../../api/resources';
import { RootState } from '../../init/store';

export type ApiResource = {
  apiResource: string;
  apiResourceName: string;
};

/**
 * Amount of time (in ms) to keep in memory resources that have no subscribers.
 * This avoids quick unsubscribe/subscribe loops, e.g. when navigation triggers
 * component destruction which calls unsubscribe() but the next page has a
 * component that immediately resubscribes.
 * @todo: This should be configurable per resource
 */
const ZOMBIE_RESOURCE_LIFETIME: number = 5000;

/**
 * Amount of time (in ms) to wait between refreshes of current subscriptions
 */
const POLLING_INTERVAL: number = 15000;

/**
 * Keeps track of resources (URLs) that are queued for unsubscription. These
 * resources are grouped per API Resource Name, so that if a resource belonging
 * to the same API Resource is subscribed to, existing resources that are queued
 * for unsubscription are immediately removed.
 */
const unsubscribeQueue: Record<string, Record<string, Task>> = {};

const apiResourceNames: Array<string> = Object.keys(apiResources);

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
function getApiResource(resource: string): ApiResource {
  for (const apiResourceName of apiResourceNames) {
    const apiResource = apiResources[apiResourceName];

    if (apiResource.urlMatches(resource)) {
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
export function* fetchResource(resource: string) {
  const { apiResource, apiResourceName } = getApiResource(resource) ?? {};

  if (apiResource) {
    const resState: SubscriptionObjectType = yield select<
      (state: RootState) => SubscriptionObjectType
    >((state) => getMemoizedSubscriptions(state)[resource]);
    let response: string;

    try {
      response = yield call(
        subscribe,
        resource,
        resState.messageType as 'json' | 'text'
      );
      yield put(subscriptionSucceeded(resource));
    } catch (err) {
      yield put(subscriptionFailed(resource, err.toString()));
      return false;
    }

    yield put<ActionType<string>>({
      // NB: the action type is generated from the key exported in /src/api/resources.ts combined with the type. Since we're using REST, the only action type is '*_SNAPSHOT'
      payload: response,
      type: `${apiResourceName}_SNAPSHOT`,
      error: null,
    });

    return true;
  }

  return false;
}

// -- Watch for subscription/unsubscription ------------------------------------

function* subscribeFlow(action: ActionType<never, SubscriptionsActionMeta>) {
  const { resource } = action.meta;
  const { apiResource, apiResourceName } = getApiResource(resource) ?? {};

  if (apiResource) {
    const { subscriberCount, hasData }: SubscriptionObjectType = yield select<
      (state: RootState) => SubscriptionObjectType
    >((state) => getMemoizedSubscriptions(state)[resource]);

    // Check if we already have subscribed to resource; exit to avoid re-request
    if (subscriberCount !== 1 || hasData) {
      return;
    }

    const tasks = unsubscribeQueue[apiResourceName];
    if (tasks) {
      // There are pending unsubscriptions on this API resource; let's expedite them
      yield all(
        Object.keys(tasks).map((resource) =>
          all([
            cancel(tasks[resource]),
            unsubscribeResource(resource, apiResourceName, true),
          ])
        )
      );
    }

    yield put(subscriptionLoading(resource));

    const success: boolean = yield fetchResource(resource);
    if (success) {
      yield put(subscriptionLoaded(resource));
    }
  }
}

function* unsubscribeFlow(action: ActionType<never, SubscriptionsActionMeta>) {
  const { resource } = action.meta;

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

function* unsubscribeResource(
  resource: string,
  apiResourceName: string,
  immediate: boolean = false
) {
  if (!immediate) {
    // Don't clear the data immediately in case something else subscribes to it
    yield delay(ZOMBIE_RESOURCE_LIFETIME);
  }

  // Confirm that there are indeed no subscribers, then remove
  const subscriberCount: number = yield select<(state: RootState) => number>(
    (state) => getMemoizedSubscriptions(state)[resource]?.subscriberCount ?? 0
  );

  if (subscriberCount === 0) {
    yield all([
      unsubscribe(resource),
      put(subscriptionEnded(resource, apiResourceName)),
    ]);
  }
}

// -- Polling ------------------------------------------------------------------

function* refreshResourceFlow(
  action: ActionType<never, SubscriptionsActionMeta>
) {
  const { resource } = action.meta;

  yield refreshResource(resource);
}

function* refreshResource(resource: string) {
  const subscriberCount: number = yield select<(state: RootState) => number>(
    (state) => getMemoizedSubscriptions(state)[resource]?.subscriberCount ?? 0
  );

  if (subscriberCount > 0) {
    yield fetchResource(resource);
  }
}

function* pollSubscriptions() {
  while (true) {
    yield delay(POLLING_INTERVAL);

    const currentSubscriptions: SubscriptionsStateType = yield select<
      (state: RootState) => SubscriptionsStateType
    >((state) => getMemoizedSubscriptions(state));
    const resources = Object.keys(currentSubscriptions);

    yield all(resources.map((resource) => refreshResource(resource)));
  }
}

// -- Main saga ----------------------------------------------------------------

export default function* watchSubscriptionActions() {
  // Start watcher sagas
  yield takeEvery(SubscriptionsActionTypes.SUBSCRIBE, subscribeFlow);
  yield takeEvery(SubscriptionsActionTypes.UNSUBSCRIBE, unsubscribeFlow);
  yield takeEvery(
    SubscriptionsActionTypes.REFRESH_SUBSCRIPTION,
    refreshResourceFlow
  );

  // Start polling
  yield pollSubscriptions();
}
