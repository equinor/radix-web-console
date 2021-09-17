import { makeActionCreator } from '../state-utils/action-creators';
import actionTypes from './action-types';

export const actions = {
  toggleFavouriteApplication: makeActionCreator(
    actionTypes.APPS_FAVOURITE_TOGGLE,
    'appName'
  ),
};

export default actions;
