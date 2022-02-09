import { makeActionCreator } from '../state-utils/action-creators';

export const restartActions = (actionPrefix, ...argNames) => {
  return {
    /**
     * Action creator for requesting a restart
     * @param {Object} component The component object
     */
    restartRequest: makeActionCreator(
      `${actionPrefix}_RESTART_REQUEST`,
      ...argNames
    ),

    /**
     * Action creator for marking a restart as complete
     */
    restartConfirm: makeActionCreator(
      `${actionPrefix}_RESTART_COMPLETE`,
      'payload'
    ),

    /**
     * Action creator for marking a restart as failed
     * @param {string} error The error message
     */
    restartFail: makeActionCreator(`${actionPrefix}_RESTART_FAIL`, 'error'),
  };
};
