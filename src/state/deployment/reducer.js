import actionTypes from './action-types';
import subscriptionsActionTypes from '../subscriptions/action-types';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEPLOYMENT_SNAPSHOT: {
      return action.payload;
    }

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'DEPLOYMENT' ? initialState : state;

    default:
      return state;
  }
};
