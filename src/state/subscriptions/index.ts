import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { get } from 'lodash';

import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from './action-types';

import { ActionType } from '../state-utils/action-creators';
import refreshActionTypes from '../subscription-refresh/action-types';
import { apiResources } from '../../api/resources';
import { RootState } from '../../init/store';

export type SubscriptionObjectType = {
  subscriberCount: number;
  hasData: boolean;
  isLoading: boolean;
  messageType: string;
  error: string;
};

export type SubscriptionsStateType = Record<string, SubscriptionObjectType>;

const initialState: SubscriptionsStateType = {};

const subscribeAction = createAction(SubscriptionsActionTypes.SUBSCRIBE);
const unsubscribeAction = createAction(SubscriptionsActionTypes.UNSUBSCRIBE);
const succeededAction = createAction(
  SubscriptionsActionTypes.SUBSCRIPTION_SUCCEEDED
);
const loadingAction = createAction(
  SubscriptionsActionTypes.SUBSCRIPTION_LOADING
);
const loadedAction = createAction(SubscriptionsActionTypes.SUBSCRIPTION_LOADED);
const failedAction = createAction(SubscriptionsActionTypes.SUBSCRIPTION_FAILED);
const endedAction = createAction(SubscriptionsActionTypes.SUBSCRIPTION_ENDED);

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(subscribeAction, (state, action) => {
        const key = (action as ActionType<never, SubscriptionsActionMeta>).meta
          .resource;

        if (state[key]) {
          state[key].subscriberCount++;
        } else {
          state[key] = {
            hasData: false,
            isLoading: false,
            messageType: (action as ActionType<never, SubscriptionsActionMeta>)
              .meta.messageType,
            subscriberCount: 1,
            error: null,
          };
        }

        return state;
      })
      .addCase(unsubscribeAction, (state, action) => {
        const key = (action as ActionType<never, SubscriptionsActionMeta>).meta
          .resource;

        if (!state[key]) {
          console.warn(
            'Attempting to unsubscribe from inexistent resource',
            key
          );
        } else if (state[key].subscriberCount === 0) {
          console.warn('Attempting to unsubscribe, but no subscribers', key);
        } else {
          state[key].subscriberCount--;
        }

        return state;
      })
      .addCase(succeededAction, (state, action) => {
        const key = (action as ActionType<never, SubscriptionsActionMeta>).meta
          .resource;

        if (state[key]) {
          state[key].error = null;
        }

        return state;
      })
      .addCase(loadingAction, (state, action) => {
        const key = (action as ActionType<never, SubscriptionsActionMeta>).meta
          .resource;

        if (state[key]) {
          state[key].isLoading = true;
        }

        return state;
      })
      .addCase(loadedAction, (state, action) => {
        const key = (action as ActionType<never, SubscriptionsActionMeta>).meta
          .resource;

        if (state[key]) {
          state[key].error = null;
          state[key].hasData = true;
          state[key].isLoading = false;
        }

        return state;
      })
      .addCase(failedAction, (state, action) => {
        const key = (action as ActionType<never, SubscriptionsActionMeta>).meta
          .resource;

        if (state[key]) {
          state[key].error = (action as ActionType).error;
          state[key].isLoading = false;
        }

        return state;
      })
      .addCase(endedAction, (state, action) => {
        const key = (action as ActionType<never, SubscriptionsActionMeta>).meta
          .resource;

        if (state[key]) {
          delete state[key];
        }

        return state;
      })
      .addDefaultCase((state, action: ActionType) => {
        switch (action.type) {
          case refreshActionTypes.SUBSCRIPTIONS_REFRESH_REQUEST: {
            // Refreshing should place all existing subscriptions in the "loading" state
            Object.keys(state).forEach((key) => {
              state[key].isLoading = true;
            }, {});
            break;
          }
        }

        return state;
      }),
});

function getResourceUrl(
  resource: string,
  resourceParams: Array<string> = []
): string {
  return (
    apiResources[resource] && apiResources[resource].makeUrl(...resourceParams)
  );
}

export const getMemoizedSubscriptions = createSelector(
  (state: RootState) => state.subscriptions,
  (subscriptions) => subscriptions
);

export function isLoading(
  state: RootState,
  resource: string,
  resourceParams: Array<string>
): boolean {
  const url = getResourceUrl(resource, resourceParams);
  return get(getMemoizedSubscriptions(state), [url, 'isLoading'], false);
}

export function hasData(
  state: RootState,
  resource: string,
  resourceParams: Array<string>
): boolean {
  const url = getResourceUrl(resource, resourceParams);
  return get(getMemoizedSubscriptions(state), [url, 'hasData'], false);
}

export function getError(
  state: RootState,
  resource: string,
  resourceParams: Array<string>
): string {
  const url = getResourceUrl(resource, resourceParams);
  return get(getMemoizedSubscriptions(state), [url, 'error']);
}

export const reducer = subscriptionsSlice.reducer;
export default reducer;
