import { combineReducers } from 'redux';
import actionTypes from './action-types';

import { makeRequestReducer } from '../state-utils/request';
import { ApplicationModelNormalizer } from '../../models/application/normalizer';
import { SubscriptionsActionTypes } from '../subscriptions/action-types';

const instanceInitialState = null;

export const appInstanceReducer = (state = instanceInitialState, action) => {
  switch (action.type) {
    case actionTypes.APP_SNAPSHOT:
      return ApplicationModelNormalizer(action.payload);

    case SubscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'APP' ? instanceInitialState : state;

    default:
      return state;
  }
};

export default combineReducers({
  instance: appInstanceReducer,
  deleteRequest: makeRequestReducer('APP_DELETE'),
  modifyRequest: makeRequestReducer('APP_MODIFY'),
});
