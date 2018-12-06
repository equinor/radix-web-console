import { makeActionCreator } from '../state-utils/action-creators';
import actionTypes from './action-types';

export default {
  saveRequest: makeActionCreator(
    actionTypes.SECRETS_SAVE_REQUEST,
    'appName',
    'envName',
    'componentName',
    'secretName',
    'value'
  ),
  saveConfirm: makeActionCreator(
    actionTypes.SECRETS_SAVE_COMPLETE,
    'secretName'
  ),
  saveFail: makeActionCreator(
    actionTypes.SECRETS_SAVE_FAIL,
    'secretName',
    'error'
  ),
  saveReset: makeActionCreator(actionTypes.SECRETS_SAVE_RESET),
};
