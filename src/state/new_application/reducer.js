import actionTypes from './action-types';
import subscriptionsActionTypes from '../subscriptions/action-types';

import { ApplicationFactory } from '../../models/factories';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_SNAPSHOT:
      return ApplicationFactory(action.payload);

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'APP' ? initialState : state;

    default:
      return state;
  }
};
