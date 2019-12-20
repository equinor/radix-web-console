import update from 'immutability-helper';

import actionTypes from './action-types';
import refreshActionTypes from '../subscription-refresh/action-types';

const subscriptionsReducer = (state = {}, action) => {
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
            hasData: { $set: true },
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
        console.warn('Attempting to unsubscribe from inexistent resource', key);
        return state;
      }

      if (state[key].subscriberCount === 0) {
        console.warn('Attempting to unsubscribe, but no subscribers', key);
        return state;
      }

      return update(state, {
        [key]: {
          subscriberCount: { $apply: currentCount => currentCount - 1 },
        },
      });
    }

    case actionTypes.SUBSCRIPTION_ENDED: {
      return update(state, { $unset: [action.resource] });
    }

    case refreshActionTypes.SUBSCRIPTIONS_REFRESH_REQUEST: {
      // Refreshing should place all existing subscriptions in the "loading" state
      const subscriptions = Object.keys(state);
      const changes = Object.assign(
        {},
        ...Array.from(subscriptions, key => ({
          [key]: {
            isLoading: { $set: true },
          },
        }))
      );

      return update(state, changes);
    }

    default:
      return state;
  }
};

export default subscriptionsReducer;
