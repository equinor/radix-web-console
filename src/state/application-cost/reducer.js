import { combineReducers } from 'redux';
import actionTypes from './action-types';
import applicationCostSetNormaliser from '../../models/application-cost-set/normaliser';
import subscriptionsActionTypes from '../subscriptions-cost-api/action-types';

const instanceInitialState = null;

export const appInstanceReducer = (state = instanceInitialState, action) => {
  switch (action.type) {
    case actionTypes.APP_COST_SNAPSHOT:
      let cost = applicationCostSetNormaliser(action.payload);
      return cost;

    case subscriptionsActionTypes.SUBSCRIPTION_COST_API_ENDED:
      return action.resourceName === 'APP_COST' ? instanceInitialState : state;

    default:
      return state;
  }
};

export default combineReducers({
  instance: appInstanceReducer,
});
