import { makeActionCreator } from '../state-utils/action-creators';
import actionTypes from './action-types';

export const actions = {
  /**
   * Action creator for setting list of known application names
   * @param {string[]} names Array of application names
   */
  setLastKnownApplicationNames: makeActionCreator(
    actionTypes.APPS_LASTKNOWN_SET,
    'appNames'
  ),

  /**
   * Action creator for adding an application name to the list of known application
   * @param {string} name Application name to add
   */
  addLastKnownApplicationName: makeActionCreator(
    actionTypes.APPS_LASTKNOWN_ADD,
    'appName'
  ),
};

export default actions;
