import update from 'immutability-helper';

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

    case actionTypes.SUBSCRIPTION_FAILED: {
      const key = action.resource;

      if (state[key]) {
        return update(state, {
          [key]: {
            error: { $set: action.error },
            isLoading: { $set: false },
          },
        });
      }

      return state;
    }

    case actionTypes.SUBSCRIPTION_LOADED: {
      const key = action.resource;

      if (state[key]) {
        return update(state, {
          [key]: {
            $unset: ['error'],
            isLoading: { $set: false },
          },
        });
      }

      return state;
    }

    case actionTypes.SUBSCRIPTION_LOADING: {
      const key = action.resource;

      if (state[key]) {
        return update(state, {
          [key]: {
            isLoading: { $set: true },
          },
        });
      }

      return state;
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

export default streamsReducer;
