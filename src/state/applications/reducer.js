import update from 'immutability-helper';
import get from 'lodash/get';
import { sha256 } from 'js-sha256';

import actionTypes from './action-types';

const initialState = {
  apps: {},
  creating: false,
};

export default (state = initialState, action) => {
  let id;

  switch (action.type) {
    case actionTypes.APPS_LIST_ADD:
      id = action.app.metadata.name;
      if (
        action.app.kind === 'RadixRegistration' &&
        get(state.apps[id], 'kind') === 'RadixApplication'
      ) {
        // Ignore adding a "RadixRegistration" if we already have a "RadixApplication"
        return state;
      }

      return update(state, {
        // apps: { [id]: { $set: action.app } },
        // We need to keep some values from the old application when
        // substituting "RadixRegistration" with "RadixApplication", since the
        // buildStatus and buildTimestamp might have been updated
        apps: { [id]: { $apply: app => Object.assign({}, app, action.app) } },
      });

    case actionTypes.APPS_LIST_REMOVE:
      return update(state, {
        apps: { $unset: [action.app.metadata.name] },
      });

    case actionTypes.APPS_ADD_REQUEST:
      return update(state, { creating: { $set: true } });

    case actionTypes.APPS_ADD_FAIL: // TODO
    case actionTypes.APPS_ADD_CONFIRM:
      return update(state, { creating: { $set: false } });

    case actionTypes.APPS_DELETE_REQUEST:
      return update(state, {
        apps: { [action.appName]: { $merge: { deleting: true } } },
      });

    case actionTypes.APPS_DELETE_FAIL: // TODO
    case actionTypes.APPS_DELETE_CONFIRM:
      return update(state, { apps: { $unset: [action.appName] } });

    case actionTypes.APPS_SET_BUILD_STATUS:
      // We need to find which app has the same "short" SHA256. Note that the
      // app name must have the string "Statoil/" prepended before the SHA256
      // hash is calculated.

      const app = Object.values(state.apps).find(app => {
        const appShortSha = sha256(`Statoil/${app.metadata.name}`).substr(
          0,
          54
        );
        return appShortSha === action.appShortSha;
      });

      if (!app) {
        return state;
      }
      id = app.metadata.name;

      // We only update if the last update timestamp is < this update timestamp

      if (app.buildTimestamp && action.timestamp < app.buildTimestamp) {
        return state;
      }

      return update(state, {
        apps: {
          [id]: {
            $merge: {
              buildStatus: action.buildStatus,
              buildTimestamp: action.timestamp,
            },
          },
        },
      });

    default:
      return state;
  }
};
