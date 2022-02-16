import { RequestState } from './request-states';

import { stringsToObject } from '../../utils/object';

/**
 * Generates boilerplate actions to track state of an async request
 *
 * @see ../README.md#Request%20states
 * @param {string} actionPrefix Prefix for the action names
 */
export const defineRequestActions = (actionPrefix) =>
  stringsToObject([
    `${actionPrefix}_REQUEST`,
    `${actionPrefix}_COMPLETE`,
    `${actionPrefix}_FAIL`,
    `${actionPrefix}_RESET`,
  ]);

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
export const makeRequestReducer =
  (actionPrefix) =>
  (
    state = { status: RequestState.IDLE, payload: null, lastError: '' },
    action
  ) => {
    switch (action.type) {
      case `${actionPrefix}_REQUEST`:
        return {
          status: RequestState.IN_PROGRESS,
          payload: null,
          lastError: '',
        };

      case `${actionPrefix}_COMPLETE`:
        return {
          status: RequestState.SUCCESS,
          payload: action.payload,
          lastError: '',
        };

      case `${actionPrefix}_FAIL`:
        return {
          status: RequestState.FAILURE,
          payload: null,
          lastError: action.error,
        };

      case `${actionPrefix}_RESET`:
        return {
          status: RequestState.IDLE,
          payload: null,
          lastError: '',
        };

      default:
        return state;
    }
  };

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
export const makeRequestReducerWithSubscriptionRefresh =
  (actionPrefix) =>
  (
    state = { status: RequestState.IDLE, payload: null, lastError: '' },
    action
  ) => {
    switch (action.type) {
      case `${actionPrefix}_REQUEST`:
        return {
          status: RequestState.IN_PROGRESS,
          payload: null,
          lastError: '',
        };

      case `${actionPrefix}_COMPLETE`:
        return {
          status: RequestState.SUCCESS,
          payload: action.payload,
          lastError: '',
        };

      case `${actionPrefix}_FAIL`:
        return {
          status: RequestState.FAILURE,
          payload: null,
          lastError: action.error,
        };

      case `${actionPrefix}_RESET`:
      case 'SUBSCRIPTIONS_REFRESH_REQUEST':
        return {
          status: RequestState.IDLE,
          payload: null,
          lastError: '',
        };

      default:
        return state;
    }
  };
