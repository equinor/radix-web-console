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
 *   someRequestState: makeRequestReducer('SOME_REQUEST'),
 * })
 */
export const makeRequestReducer = actionPrefix => (
  state = requestStates.IDLE,
  action
) => {
  switch (action.type) {
    case `${actionPrefix}_REQUEST`:
      return requestStates.IN_PROGRESS;

    case `${actionPrefix}_CONFIRM`:
      return requestStates.SUCCESS;

    case `${actionPrefix}_FAIL`:
      return requestStates.FAILURE;

    case `${actionPrefix}_RESET`:
      return requestStates.IDLE;

    default:
      return state;
  }
};
