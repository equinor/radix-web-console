import update from 'immutability-helper';
import get from 'lodash/get';
import { combineReducers } from 'redux';

import { makeRequestReducer } from '../state-utils/request';
import actionTypes from './action-types';

const appsReducer = (state = {}, action) => {
  let id;

  switch (action.type) {
    case actionTypes.APPS_LIST_ADD:
      id = action.app.metadata.name;
      if (
        action.app.kind === 'RadixRegistration' &&
        get(state[id], 'kind') === 'RadixApplication'
      ) {
        // Ignore adding a "RadixRegistration" if we already have a "RadixApplication"
        return state;
      }

      return update(state, {
        // We need to keep some values from the old application when
        // substituting "RadixRegistration" with "RadixApplication", since the
        // jobStatus, jobs, and jobTimestamp might have been updated
        [id]: { $apply: app => Object.assign({ jobs: {} }, app, action.app) },
      });

    case actionTypes.APPS_LIST_REMOVE:
      return update(state, { $unset: [action.app.metadata.name] });

    case actionTypes.APPS_DELETE_REQUEST:
      return update(state, {
        [action.id]: { $merge: { deleting: true } },
      });

    case actionTypes.APPS_DELETE_FAIL: // TODO
    case actionTypes.APPS_DELETE_COMPLETE:
      return update(state, { $unset: [action.appName] });

    default:
      return state;
  }
};

export default combineReducers({
  apps: appsReducer,
  creation: makeRequestReducer('APPS_ADD'),
});
