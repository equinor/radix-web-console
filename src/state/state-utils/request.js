import requestStates from './request-states';
import { stringsToObject } from '../../utils/object';

/**
 * Generates boilerplate actions to track state of an async request
 *
 * @param {string} actionPrefix Prefix for the action names
 */
export const defineRequestActions = actionPrefix =>
  stringsToObject([
    `${actionPrefix}_REQUEST`,
    `${actionPrefix}_CONFIRM`,
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
export const makeRequestReducer = actionPrefix => (
  state = { status: requestStates.IDLE, lastError: '' },
  action
) => {
  switch (action.type) {
    case `${actionPrefix}_REQUEST`:
      return {
        status: requestStates.IN_PROGRESS,
        lastError: '',
      };

    case `${actionPrefix}_CONFIRM`:
      return {
        status: requestStates.SUCCESS,
        lastError: '',
      };

    case `${actionPrefix}_FAIL`:
      return {
        status: requestStates.FAILURE,
        lastError: action.error,
      };

    case `${actionPrefix}_RESET`:
      return {
        status: requestStates.IDLE,
        lastError: '',
      };

    default:
      return state;
  }
};
