import { makeActionCreator } from '../state-utils/action-creators';
import actionTypes from './action-types';

export const podLogRequest = makeActionCreator(
  actionTypes.POD_LOGS_REQUEST,
  'pod'
);
export const podLogConfirm = makeActionCreator(
  actionTypes.POD_LOGS_COMPLETE,
  'payload'
);
export const podLogFail = makeActionCreator(actionTypes.POD_LOGS_FAIL, 'error');
export const podLogReset = makeActionCreator(actionTypes.POD_LOGS_RESET);
