import { makeActionCreator } from '../state-utils/action-creators';
import actionTypes from './action-types';

export default {
  podLogRequest: makeActionCreator(actionTypes.POD_LOGS_REQUEST, 'pod'),
  podLogConfirm: makeActionCreator(actionTypes.POD_LOGS_COMPLETE, 'payload'),
  podLogFail: makeActionCreator(actionTypes.POD_LOGS_FAIL, 'error'),
  podLogReset: makeActionCreator(actionTypes.POD_LOGS_RESET),
};
