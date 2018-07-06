import { makeActionCreator } from '../state-utils/action-creators';
import actionTypes from './action-types';

export default {
  addToList: makeActionCreator(actionTypes.SECRETS_LIST_ADD, 'secret'),
  removeFromList: makeActionCreator(actionTypes.SECRETS_LIST_REMOVE, 'id'),
};
