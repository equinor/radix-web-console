import { makeActionCreator } from '../state-utils/action-creators';

import actionTypes from './action-types';

export default {
  /**
   * Action creator for requesting an job creation
   * @param {Object} job The job object
   */
  addJobRequest: makeActionCreator(actionTypes.JOB_CREATION_REQUEST, 'job'),

  /**
   * Action creator for marking an job creation as complete
   */
  addJobConfirm: makeActionCreator(
    actionTypes.JOB_CREATION_COMPLETE,
    'payload'
  ),

  /**
   * Action creator for marking an job creation as failed
   * @param {string} error The error message
   */
  addJobFail: makeActionCreator(actionTypes.JOB_CREATION_FAIL, 'error'),

  /**
   * Action creator for resetting job creation status
   */
  addJobReset: makeActionCreator(actionTypes.JOB_CREATION_RESET),
};
