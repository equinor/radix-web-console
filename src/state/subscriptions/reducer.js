import update from 'immutability-helper';

import actionTypes from './action-types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBSCRIBE: {
      const key = action.resource;

      if (state[key]) {
        return update(state, {
          [key]: {
            subscriberCount: { $apply: currentCount => currentCount + 1 },
          },
        });
      }

      return update(state, { [key]: { $set: { subscriberCount: 1 } } });
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
