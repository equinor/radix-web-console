import { makeActionCreator } from '../state-utils/action-creators';

export const startActions = (actionPrefix, ...argNames) => ({
  /**
   * Action creator for requesting start of a resource
   * @param {Array} argNames Array of arguments for start request
   */
  startRequest: makeActionCreator(`${actionPrefix}_START_REQUEST`, ...argNames),

  /**
   * Action creator for marking a start as complete
   */
  startConfirm: makeActionCreator(`${actionPrefix}_START_COMPLETE`, 'payload'),

  /**
   * Action creator for marking a start as failed
   * @param {string} error The error message
   */
  startFail: makeActionCreator(`${actionPrefix}_START_FAIL`, 'error'),
});
