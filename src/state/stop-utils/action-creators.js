import { makeActionCreator } from '../state-utils/action-creators';

export const stopActions = (actionPrefix, ...argNames) => {
  return {
    /**
     * Action creator for requesting a stop
     * @param {Array} argNames Array of arguments for stop request
     */
    stopRequest: makeActionCreator(`${actionPrefix}_STOP_REQUEST`, ...argNames),

    /**
     * Action creator for marking a stop as complete
     */
    stopConfirm: makeActionCreator(`${actionPrefix}_STOP_COMPLETE`, 'payload'),

    /**
     * Action creator for marking a stop as failed
     * @param {string} error The error message
     */
    stopFail: makeActionCreator(`${actionPrefix}_STOP_FAIL`, 'error'),
  };
};
