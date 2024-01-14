import { actionTypes } from './action-types';

import { makeActionCreator } from '../state-utils/action-creators';
import { createJob } from '../../api/jobs';
import { JobModel } from '../../models/radix-api/jobs/job';

export const actions = {
  /**
   * Action creator for requesting a job creation
   * @param {Object} job The job object
   */
  addJobRequest: makeActionCreator<
    never,
    { job: Parameters<typeof createJob>[0] },
    [job: Parameters<typeof createJob>[0]]
  >(actionTypes.JOB_CREATION_REQUEST, 'job'),

  /**
   * Action creator for marking a job creation as complete
   */
  addJobConfirm: makeActionCreator<JobModel, never, [payload: JobModel]>(
    actionTypes.JOB_CREATION_COMPLETE,
    'payload'
  ),

  /**
   * Action creator for marking a job creation as failed
   * @param {string} error The error message
   */
  addJobFail: makeActionCreator<never, never, [error: string]>(
    actionTypes.JOB_CREATION_FAIL,
    'error'
  ),
};
