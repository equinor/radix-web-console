import {
  CaseReducer,
  createAction,
  createSlice,
  PayloadActionCreator,
  Reducer,
  Slice,
} from '@reduxjs/toolkit';

import type { ActionType } from './action-creators';
import { RequestState } from './request-states';

import { stringsToObject } from '../../utils/object';

export type RequestReducerState<P = unknown> = {
  status: RequestState;
  payload: P;
  lastError: string;
};

/**
 * A type that magically prefixes every key in an object type
 */
type PrefixObjectType<P extends string, T extends Record<string, unknown>> = {
  [K in keyof T as K extends string ? `${P}${K}` : never]: T[K];
};

/**
 * Generates boilerplate actions to track state of an async request
 *
 * @see ../README.md#Request%20states
 * @param {string} actionPrefix Prefix for the action names
 */
export function defineRequestActions<T extends string>(
  actionPrefix: T
): Record<
  keyof PrefixObjectType<
    T,
    { _REQUEST: string; _COMPLETE: string; _FAIL: string; _RESET: string }
  >,
  string
> {
  return stringsToObject([
    `${actionPrefix}_REQUEST`,
    `${actionPrefix}_COMPLETE`,
    `${actionPrefix}_FAIL`,
    `${actionPrefix}_RESET`,
  ]);
}

/**
 * Generate a boilerplate reduxjs slice for use with request actions
 *
 * @param {string} slicePrefix prefix for the slice
 * @param {array} additionalExtraReducers [optional] array of extraReducers
 */
function makeRequestSlice<P, T extends string>(
  slicePrefix: string,
  additionalExtraReducers: Array<{
    action: PayloadActionCreator<P, T>;
    reducer: CaseReducer<RequestReducerState<P>, ActionType<P>>;
  }> = []
): Slice<RequestReducerState<P>, {}> {
  const actionRequest = createAction(`${slicePrefix}_REQUEST`);
  const actionComplete = createAction<P>(`${slicePrefix}_COMPLETE`);
  const actionFail = createAction(`${slicePrefix}_FAIL`);
  const actionReset = createAction(`${slicePrefix}_RESET`);

  return createSlice<RequestReducerState<P>, {}>({
    name: `${slicePrefix.toLowerCase()}_request`,
    initialState: {
      status: RequestState.IDLE,
      payload: null,
      lastError: '',
    },
    reducers: {},
    extraReducers: (builder) =>
      additionalExtraReducers
        .reduce((builder, { action, reducer }) => {
          builder.addCase(action, reducer as CaseReducer);
          return builder;
        }, builder)
        .addCase(actionRequest, () => ({
          status: RequestState.IN_PROGRESS,
          payload: null,
          lastError: '',
        }))
        .addCase(actionComplete, (_, action) => ({
          status: RequestState.SUCCESS,
          payload: action.payload,
          lastError: '',
        }))
        .addCase(actionFail, (_, action) => ({
          status: RequestState.FAILURE,
          payload: null,
          lastError: (action as ActionType).error,
        }))
        .addCase(actionReset, () => ({
          status: RequestState.IDLE,
          payload: null,
          lastError: '',
        }))
        .addDefaultCase((state) => state),
  });
}

/**
 * Generate a boilerplate reducer for a state key used to track async state of
 * a request. Use this with Redux's `combineReducers()`. This works in tandem
 * with `defineRequestActions()` when using the same actionPrefix.

 * @param {string} actionPrefix Prefix of the actions to listen for
 * @example
 * const reducer = combineReducers({
 *   someKey: someCustomReducer,
 *   someRequest: makeRequestReducer('SOME_REQUEST'),
 * })
 */
export function makeRequestReducer<P>(
  actionPrefix: string
): Reducer<RequestReducerState<P>, ActionType<P>> {
  return makeRequestSlice<P, string>(actionPrefix).reducer;
}

/**
 * Generate a boilerplate reducer for a state key used to track async state of
 * a request. Use this with Redux's `combineReducers()`. This works in tandem
 * with `defineRequestActions()` when using the same actionPrefix.
 *
 * In addition, this will force a refresh of subscription to ensure data is
 * up to date. Typically used in a command pattern

 * @param {string} actionPrefix Prefix of the actions to listen for
 * @example
 * const reducer = combineReducers({
 *   someKey: someCustomReducer,
 *   someRequest: makeRequestReducerWithSubscriptionRefresh('SOME_REQUEST'),
 * })
 */
export function makeRequestReducerWithSubscriptionRefresh<P>(
  actionPrefix: string
): Reducer<RequestReducerState<P>, ActionType<P>> {
  return makeRequestSlice<P, string>(actionPrefix, [
    {
      action: createAction('SUBSCRIPTIONS_REFRESH_REQUEST'),
      reducer: () => ({
        status: RequestState.IDLE,
        payload: null,
        lastError: '',
      }),
    },
  ]).reducer;
}
