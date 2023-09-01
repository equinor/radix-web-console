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
 * Action postfix
 */
enum RequestActionTypes {
  REQUEST = 'REQUEST',
  COMPLETE = 'COMPLETE',
  FAIL = 'FAIL',
  RESET = 'RESET',
}

/**
 * A type for prefixing a RequestActionType
 */
type PrefixActionName<
  Name extends string,
  Action extends RequestActionTypes,
> = `${Name}_${Action}`;

/**
 * A type that magically generates a prefixed mapped RequestActionTypes object
 */
type PrefixObjectType<N extends string> = {
  [K in RequestActionTypes as PrefixActionName<N, K>]: PrefixActionName<N, K>;
};

/**
 * Generate action name
 */
function createActionName<P extends string, K extends RequestActionTypes>(
  prefix: P,
  action: K
): PrefixActionName<P, K> {
  return `${prefix}_${action}`;
}

/**
 * Generates boilerplate actions to track state of an async request
 *
 * @see ../README.md#Request%20states
 * @param {string} actionPrefix Prefix for the action names
 */
export function defineRequestActions<N extends string>(
  actionPrefix: N
): PrefixObjectType<N> {
  return stringsToObject<string>(
    Object.values(RequestActionTypes).map((action) =>
      createActionName(actionPrefix, action)
    )
  ) as PrefixObjectType<N>;
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
  // prepare a set of default actions mapped to RequestActionTypes
  const actions = (
    Object.keys(RequestActionTypes) as Array<RequestActionTypes>
  ).reduce<{ [K in RequestActionTypes]?: PayloadActionCreator<P> }>(
    (obj, key) => ({
      ...obj,
      [key]: createAction<P>(createActionName(slicePrefix, key)),
    }),
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
        .addCase(actions.REQUEST, () => ({
          status: RequestState.IN_PROGRESS,
          payload: null,
          lastError: '',
        }))
        .addCase(actions.COMPLETE, (_, action) => ({
          status: RequestState.SUCCESS,
          payload: action.payload,
          lastError: '',
        }))
        .addCase(actions.FAIL, (_, action) => ({
          status: RequestState.FAILURE,
          payload: null,
          lastError: (action as ActionType).error,
        }))
        .addCase(actions.RESET, () => ({
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
 *
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
 *
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
