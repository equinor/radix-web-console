import { makeActionCreator } from '../state-utils/action-creators';
import actionTypes from './action-types';

export const jobLogRequest = makeActionCreator(
  actionTypes.JOB_LOGS_REQUEST,
  'job'
);
export const jobLogConfirm = makeActionCreator(
  actionTypes.JOB_LOGS_COMPLETE,
  'payload'
);
export const jobLogFail = makeActionCreator(actionTypes.JOB_LOGS_FAIL, 'error');
export const jobLogReset = makeActionCreator(actionTypes.JOB_LOGS_RESET);
