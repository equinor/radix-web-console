import { combineReducers } from 'redux';
import update from 'immutability-helper';
import { makeRequestReducer } from '../state-utils/request';

import actionTypes from './action-types';

const streamsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SUBSCRIBE: {
      const key = action.resource;
      const messageType = action.messageType;

      if (state[key]) {
        return update(state, {
          [key]: {
            subscriberCount: { $apply: currentCount => currentCount + 1 },
          },
        });
      }

      return update(state, {
        [key]: { $set: { subscriberCount: 1, messageType } },
      });
    }

    case actionTypes.UNSUBSCRIBE: {
      const key = action.resource;

      if (!state[key]) {
        return state;
      }

      if (state[key].subscriberCount > 1) {
        return update(state, {
          [key]: {
            subscriberCount: { $apply: currentCount => currentCount - 1 },
          },
        });
      }

      return update(state, { $unset: [key] });
    }

    default:
      return state;
  }
};

export default combineReducers({
  streams: streamsReducer,
  status: makeRequestReducer('SUBSCRIPTIONS_REFRESH'),
});
