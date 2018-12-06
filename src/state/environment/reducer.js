import actionTypes from './action-types';
import subscriptionsActionTypes from '../subscriptions/action-types';

import { EnvironmentFactory } from '../../models/factories';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ENVIRONMENT_SNAPSHOT:
      return EnvironmentFactory(action.payload);

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'ENVIRONMENT' ? initialState : state;

    default:
      return state;
  }
};
