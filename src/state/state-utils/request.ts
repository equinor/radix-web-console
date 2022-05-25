import { AnyAction, createAction, createSlice } from '@reduxjs/toolkit';

import { RequestState } from './request-states';

import { stringsToObject } from '../../utils/object';

export type ReducerActionType = AnyAction & {
  resource: string;
  messageType: string;
  error: string;
};

export type ReducerStateType<P> = {
  status: RequestState;
  payload: P;
  lastError: string;
};

/**
 * Generates boilerplate actions to track state of an async request
 *
 * @see ../README.md#Request%20states
 * @param {string} actionPrefix Prefix for the action names
 */
export function defineRequestActions(actionPrefix: string): {
  [key: string]: string;
} {
  return stringsToObject([
    `${actionPrefix}_REQUEST`,
    `${actionPrefix}_COMPLETE`,
    `${actionPrefix}_FAIL`,
    `${actionPrefix}_RESET`,
  ]);
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
): (
  state: ReducerStateType<P>,
  action: ReducerActionType
) => ReducerStateType<P> {
  const actionRequest = createAction(`${actionPrefix}_REQUEST`);
  const actionComplete = createAction(`${actionPrefix}_COMPLETE`);
  const actionFail = createAction(`${actionPrefix}_FAIL`);
  const actionReset = createAction(`${actionPrefix}_RESET`);

  return createSlice<ReducerStateType<P>, {}>({
    name: 'subscriptions',
    initialState: {
      status: RequestState.IDLE,
      payload: null,
      lastError: '',
    },
    reducers: {},
    extraReducers: (builder) =>
      builder
        .addCase(actionRequest, () => ({
          status: RequestState.IN_PROGRESS,
          payload: null,
          lastError: '',
        }))
        .addCase(actionComplete, (action) => ({
          status: RequestState.SUCCESS,
          payload: action.payload,
          lastError: '',
        }))
        .addCase(actionFail, (action) => ({
          status: RequestState.FAILURE,
          payload: null,
          lastError: (action as unknown as ReducerActionType).error,
        }))
        .addCase(actionReset, () => ({
          status: RequestState.IDLE,
          payload: null,
          lastError: '',
        }))
        .addDefaultCase((state) => state),
  }).reducer;
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
): (
  state: ReducerStateType<P>,
  action: ReducerActionType
) => ReducerStateType<P> {
  const actionRequest = createAction(`${actionPrefix}_REQUEST`);
  const actionComplete = createAction(`${actionPrefix}_COMPLETE`);
  const actionFail = createAction(`${actionPrefix}_FAIL`);
  const actionReset = createAction(`${actionPrefix}_RESET`);
  const actionRefresh = createAction('SUBSCRIPTIONS_REFRESH_REQUEST');

  return createSlice<ReducerStateType<P>, {}>({
    name: 'subscriptions',
    initialState: {
      status: RequestState.IDLE,
      payload: null,
      lastError: '',
    },
    reducers: {},
    extraReducers: (builder) =>
      builder
        .addCase(actionRequest, () => ({
          status: RequestState.IN_PROGRESS,
          payload: null,
          lastError: '',
        }))
        .addCase(actionComplete, (action) => ({
          status: RequestState.SUCCESS,
          payload: action.payload,
          lastError: '',
        }))
        .addCase(actionFail, (action) => ({
          status: RequestState.FAILURE,
          payload: null,
          lastError: (action as unknown as ReducerActionType).error,
        }))
        .addCase(actionReset, () => ({
          status: RequestState.IDLE,
          payload: null,
          lastError: '',
        }))
        .addCase(actionRefresh, () => ({
          status: RequestState.IDLE,
          payload: null,
          lastError: '',
        }))
        .addDefaultCase((state) => state),
  }).reducer;
}
