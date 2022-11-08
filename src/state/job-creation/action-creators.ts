import actionTypes from './action-types';

import { makeActionCreator } from '../state-utils/action-creators';
import { createJob } from '../../api/jobs';
import { JobModel } from '../../models/job';

export const actions = {
  /**
   * Action creator for requesting an job creation
   * @param {Object} job The job object
   */
  addJobRequest: makeActionCreator<
    never,
    { job: Parameters<typeof createJob> }
  >(actionTypes.JOB_CREATION_REQUEST, 'job'),

  /**
   * Action creator for marking an job creation as complete
   */
  addJobConfirm: makeActionCreator<JobModel, never>(
    actionTypes.JOB_CREATION_COMPLETE,
    'payload'
  ),

  /**
   * Action creator for marking an job creation as failed
   * @param {string} error The error message
   */
  addJobFail: makeActionCreator<never, never>(
    actionTypes.JOB_CREATION_FAIL,
    'error'
  ),

  /**
   * Action creator for resetting job creation status
   */
  addJobReset: makeActionCreator<never, never>(actionTypes.JOB_CREATION_RESET),
};

export default actions;
