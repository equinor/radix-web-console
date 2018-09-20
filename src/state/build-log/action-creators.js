import { makeActionCreator } from '../state-utils/action-creators';
import actionTypes from './action-types';

export const buildLogRequest = makeActionCreator(
  actionTypes.BUILD_LOGS_REQUEST,
  'job'
);
export const buildLogConfirm = makeActionCreator(
  actionTypes.BUILD_LOGS_COMPLETE,
  'payload'
);
export const buildLogFail = makeActionCreator(
  actionTypes.BUILD_LOGS_FAIL,
  'error'
);
export const buildLogReset = makeActionCreator(actionTypes.BUILD_LOGS_RESET);
