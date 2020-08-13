import update from 'immutability-helper';
import actionTypes from './action-types';

const subscriptionsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SUBSCRIBE_COST_API: {
      const key = action.resource;
      const messageType = action.messageType;

      if (state[key]) {
        return update(state, {
          [key]: {
            subscriberCount: { $apply: (currentCount) => currentCount + 1 },
          },
        });
      }

      return update(state, {
        [key]: {
          $set: {
            hasData: false,
            isLoading: false,
            messageType,
            subscriberCount: 1,
          },
        },
      });
    }

    case actionTypes.SUBSCRIPTION_COST_API_FAILED: {
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

    case actionTypes.SUBSCRIPTION_COST_API_LOADED: {
      const key = action.resource;

      if (state[key]) {
        return update(state, {
          [key]: {
            $unset: ['error'],
            hasData: { $set: true },
            isLoading: { $set: false },
          },
        });
      }

      return state;
    }

    case actionTypes.SUBSCRIPTION_COST_API_LOADING: {
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

    case actionTypes.UNSUBSCRIBE_COST_API: {
      const key = action.resource;

      if (!state[key]) {
        console.warn('Attempting to unsubscribe from inexistent resource', key);
        return state;
      }

      if (state[key].subscriberCount === 0) {
        console.warn('Attempting to unsubscribe, but no subscribers', key);
        return state;
      }

      return update(state, {
        [key]: {
          subscriberCount: { $apply: (currentCount) => currentCount - 1 },
        },
      });
    }

    case actionTypes.SUBSCRIPTION_COST_API_ENDED: {
      return update(state, { $unset: [action.resource] });
    }

    default:
      return state;
  }
};

export default subscriptionsReducer;
