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
 * Action postfix
 */
export enum RequestActionTypes {
  _REQUEST = '_REQUEST',
  _COMPLETE = '_COMPLETE',
  _FAIL = '_FAIL',
  _RESET = '_RESET',
}

/**
 * Generate action name
 */
export function createActionName<
  P extends string,
  K extends RequestActionTypes
>(prefix: P, action: K): `${P}${K}` {
  return `${prefix}${action}`;
}

/**
 * Generates boilerplate actions to track state of an async request
 *
 * @see ../README.md#Request%20states
 * @param {string} actionPrefix Prefix for the action names
 */
export function defineRequestActions<N extends string>(
  actionPrefix: N
): Record<keyof PrefixObjectType<N, typeof RequestActionTypes>, string> {
  return stringsToObject(
    Object.values(RequestActionTypes).map((action) =>
      createActionName(actionPrefix, action)
    )
  );
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
  const actions = Object.values(defineRequestActions(slicePrefix)).reduce<
    Record<
      keyof PrefixObjectType<typeof slicePrefix, typeof RequestActionTypes>,
      PayloadActionCreator<P, string>
    >
  >(
    (obj, value: T) => ({ ...obj, ...{ [value]: createAction<P, T>(value) } }),
    {}
  );

  return createSlice<RequestReducerState<P>, {}>({
    name: `${slicePrefix.toLowerCase()}_request_slice`,
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
        .addCase(
          actions[createActionName(slicePrefix, RequestActionTypes._REQUEST)],
          () => ({
            status: RequestState.IN_PROGRESS,
            payload: null,
            lastError: '',
          })
        )
        .addCase(
          actions[createActionName(slicePrefix, RequestActionTypes._COMPLETE)],
          (_, action) => ({
            status: RequestState.SUCCESS,
            payload: action.payload,
            lastError: '',
          })
        )
        .addCase(
          actions[createActionName(slicePrefix, RequestActionTypes._FAIL)],
          (_, action) => ({
            status: RequestState.FAILURE,
            payload: null,
            lastError: (action as ActionType).error,
          })
        )
        .addCase(
          actions[createActionName(slicePrefix, RequestActionTypes._RESET)],
          () => ({ status: RequestState.IDLE, payload: null, lastError: '' })
        )
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
