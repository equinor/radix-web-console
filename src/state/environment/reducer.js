import actionTypes from './action-types';
import subscriptionsActionTypes from '../subscriptions/action-types';
import update from 'immutability-helper';

import { EnvironmentFactory } from 'radix-web-console-models';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ENVIRONMENT_SNAPSHOT:
      return update(state, {
        $set: { instance: EnvironmentFactory(action.payload) },
      });

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'ENVIRONMENT' ? initialState : state;

    case actionTypes.ENVIRONMENT_DELETE_FAIL:
      return update(state, { $set: { ...state, error: action.error } });

    case actionTypes.ENVIRONMENT_DELETE_COMPLETE:
      return update(state, { $set: { isDeleted: true } });

    default:
      return state;
  }
};
