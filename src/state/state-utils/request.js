import requestStates from './request-states';

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
    state = { status: requestStates.IDLE, payload: null, lastError: '' },
    action
  ) => {
    switch (action.type) {
      case `${actionPrefix}_REQUEST`:
        return {
          status: requestStates.IN_PROGRESS,
          payload: null,
          lastError: '',
        };

      case `${actionPrefix}_COMPLETE`:
        return {
          status: requestStates.SUCCESS,
          payload: action.payload,
          lastError: '',
        };

      case `${actionPrefix}_FAIL`:
        return {
          status: requestStates.FAILURE,
          payload: null,
          lastError: action.error,
        };

      case `${actionPrefix}_RESET`:
        return {
          status: requestStates.IDLE,
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
    state = { status: requestStates.IDLE, payload: null, lastError: '' },
    action
  ) => {
    switch (action.type) {
      case `${actionPrefix}_REQUEST`:
        return {
          status: requestStates.IN_PROGRESS,
          payload: null,
          lastError: '',
        };

      case `${actionPrefix}_COMPLETE`:
        return {
          status: requestStates.SUCCESS,
          payload: action.payload,
          lastError: '',
        };

      case `${actionPrefix}_FAIL`:
        return {
          status: requestStates.FAILURE,
          payload: null,
          lastError: action.error,
        };

      case `${actionPrefix}_RESET`:
      case 'SUBSCRIPTIONS_REFRESH_REQUEST':
        return {
          status: requestStates.IDLE,
          payload: null,
          lastError: '',
        };

      default:
        return state;
    }
  };
