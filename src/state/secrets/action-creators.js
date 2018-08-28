import { makeActionCreator } from '../state-utils/action-creators';
import actionTypes from './action-types';

export default {
  addToList: makeActionCreator(actionTypes.SECRETS_LIST_ADD, 'secret'),
  removeFromList: makeActionCreator(actionTypes.SECRETS_LIST_REMOVE, 'name'),

  saveRequest: makeActionCreator(
    actionTypes.SECRETS_SAVE_REQUEST,
    'componentName',
    'namespace',
    'secret'
  ),
  saveConfirm: makeActionCreator(actionTypes.SECRETS_SAVE_COMPLETE),
  saveFail: makeActionCreator(actionTypes.SECRETS_SAVE_FAIL, 'error'),
  saveReset: makeActionCreator(actionTypes.SECRETS_SAVE_RESET),
};
