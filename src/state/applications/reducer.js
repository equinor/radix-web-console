import update from 'immutability-helper';
import get from 'lodash/get';
import { combineReducers } from 'redux';

import { makeRequestReducer } from '../state-utils/request';
import actionTypes from './action-types';
import buildStatuses from './build-statuses';

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
        // buildStatus, builds, and buildTimestamp might have been updated
        [id]: { $apply: app => Object.assign({ builds: {} }, app, action.app) },
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

    case actionTypes.APPS_UPDATE_BUILDS:
      const appName = action.appName;
      const app = state[appName];

      if (!app) {
        return state;
      }

      const status = action.build.status;
      const actionTimestamp = status.completionTime || status.startTime;

      // We only update buildStatus if the last update timestamp is < this
      // update timestamp

      let buildStatus;
      let buildTimestamp = actionTimestamp;

      if (app.buildTimestamp && actionTimestamp < app.buildTimestamp) {
        buildStatus = app.buildStatus || buildStatuses.IDLE;
        buildTimestamp = app.buildTimestamp;
      } else {
        if (!status.completionTime) {
          buildStatus = buildStatuses.BUILDING;
        } else if (status.failed) {
          buildStatus = buildStatuses.FAILURE;
        } else if (status.succeeded) {
          buildStatus = buildStatuses.SUCCESS;
        }
      }

      return update(state, {
        [appName]: {
          $merge: {
            buildStatus,
            buildTimestamp,
            builds: update(app.builds, {
              $merge: {
                [action.build.metadata.name]: action.build,
              },
            }),
          },
        },
      });

    default:
      return state;
  }
};

export default combineReducers({
  apps: appsReducer,
  creation: makeRequestReducer('APPS_ADD'),
});
