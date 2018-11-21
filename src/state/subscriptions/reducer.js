import update from 'immutability-helper';

import actionTypes from './action-types';

const initialState = {
  status: {},
  streams: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBSCRIBE: {
      const key = action.resource;

      if (state.streams[key]) {
        return update(state, {
          streams: {
            [key]: {
              subscriberCount: { $apply: currentCount => currentCount + 1 },
            },
          },
        });
      }

      return update(state, {
        streams: { [key]: { $set: { subscriberCount: 1 } } },
      });
    }

    case actionTypes.SUBSCRIPTIONS_REFRESH_END: {
      return update(state, { status: { isRefreshing: { $set: false } } });
    }

    case actionTypes.SUBSCRIPTIONS_REFRESH_START: {
      return update(state, { status: { isRefreshing: { $set: true } } });
    }

    case actionTypes.UNSUBSCRIBE: {
      const key = action.resource;

      if (!state.streams[key]) {
        return state;
      }

      if (state.streams[key].subscriberCount > 1) {
        return update(state, {
          streams: {
            [key]: {
              subscriberCount: { $apply: currentCount => currentCount - 1 },
            },
          },
        });
      }

      return update(state, { streams: { $unset: [key] } });
    }

    default:
      return state;
  }
};
