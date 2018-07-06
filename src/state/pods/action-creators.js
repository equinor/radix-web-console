import { makeActionCreator } from '../state-utils/action-creators';
import actionTypes from './action-types';

export default {
  addToList: makeActionCreator(actionTypes.PODS_LIST_ADD, 'pod'),
  removeFromList: makeActionCreator(actionTypes.PODS_LIST_REMOVE, 'id'),
};
