import update from 'immutability-helper';
import get from 'lodash/get';

import actionTypes from './action-types';

const initialState = {
  apps: {},
  creating: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APPS_LIST_ADD:
      const uid = action.app.metadata.uid;
      if (
        action.app.kind === 'RadixRegistration' &&
        get(state.apps[uid], 'kind') === 'RadixApplication'
      ) {
        // Ignore adding a "RadixRegistration" if we already have a "RadixApplication"
        return state;
      }

      return update(state, {
        apps: { [uid]: { $set: action.app } },
      });
    case actionTypes.APPS_LIST_REMOVE:
      return update(state, {
        apps: { $unset: [action.app.metadata.uid] },
      });
    case actionTypes.APPS_ADD_REQUEST:
      return update(state, { creating: { $set: true } });
    case actionTypes.APPS_ADD_FAIL: // TODO
    case actionTypes.APPS_ADD_CONFIRM:
      return update(state, { creating: { $set: false } });

    default:
      return state;
  }
};
