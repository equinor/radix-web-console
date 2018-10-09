import update from 'immutability-helper';
import get from 'lodash/get';
import { combineReducers } from 'redux';

import { makeRequestReducer } from '../state-utils/request';
import actionTypes from './action-types';
import jobStatuses from './job-statuses';

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

    case actionTypes.APPS_UPDATE_JOBS:
      const appName = action.appName;
      const app = state[appName];

      if (!app) {
        return state;
      }

      const status = action.job.status;
      const actionTimestamp = status.completionTime || status.startTime;

      // We only update jobStatus if the last update timestamp is < this
      // update timestamp

      let jobStatus;
      let jobTimestamp = actionTimestamp;

      if (app.jobTimestamp && actionTimestamp < app.jobTimestamp) {
        jobStatus = app.jobStatus || jobStatuses.IDLE;
        jobTimestamp = app.jobTimestamp;
      } else {
        if (status.failed) {
          jobStatus = jobStatuses.FAILURE;
        } else if (!status.completionTime) {
          jobStatus = jobStatuses.BUILDING;
        } else if (status.succeeded) {
          jobStatus = jobStatuses.SUCCESS;
        }
      }

      return update(state, {
        [appName]: {
          $merge: {
            jobStatus,
            jobTimestamp,
            jobs: update(app.jobs, {
              $merge: {
                [action.job.metadata.name]: action.job,
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
