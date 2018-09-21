import { makeActionCreator } from '../state-utils/action-creators';
import actionTypes from './action-types';

export const jobLogsRequest = makeActionCreator(
  actionTypes.JOB_LOGS_REQUEST,
  'job',
  'components'
);
export const jobLogsConfirm = makeActionCreator(
  actionTypes.JOB_LOGS_COMPLETE,
  'payload'
);
export const jobLogsFail = makeActionCreator(
  actionTypes.JOB_LOGS_FAIL,
  'error'
);
export const jobLogsReset = makeActionCreator(actionTypes.JOB_LOGS_RESET);
