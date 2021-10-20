import actionTypes from './action-types';
import subscriptionsActionTypes from '../subscriptions/action-types';
import alertingNormaliser from '../../models/alerting/normaliser';
import { combineReducers } from 'redux';
import { makeRequestReducer } from '../state-utils/request';

const initialState = null;

export const environmentAlertingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ENVIRONMENT_ALERTING_SNAPSHOT:
      return alertingNormaliser(action.payload);
    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'ENVIRONMENT_ALERTING'
        ? initialState
        : state;
    default:
      return state;
  }
};

export default combineReducers({
  instance: environmentAlertingReducer,
  enableRequest: makeRequestReducer('ENVIRONMENT_ALERTING_ENABLE'),
  disableRequest: makeRequestReducer('ENVIRONMENT_ALERTING_DISABLE'),
  updateRequest: makeRequestReducer('ENVIRONMENT_ALERTING_UPDATE'),
});
