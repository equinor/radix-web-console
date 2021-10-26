import subscriptionsActionTypes from '../subscriptions/action-types';
import alertingNormaliser from '../../models/alerting/normaliser';
import { combineReducers } from 'redux';
import { makeRequestReducer } from '../state-utils/request';

const initialState = null;

const alertingReducer = (actionPrefix) => {
  const environmentAlertingReducer = (state = initialState, action) => {
    switch (action.type) {
      case `${actionPrefix}_SNAPSHOT`:
        return alertingNormaliser(action.payload);
      case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
        return action.resourceName === actionPrefix ? initialState : state;
      default:
        return state;
    }
  };

  return combineReducers({
    instance: environmentAlertingReducer,
    enableRequest: makeRequestReducer(`${actionPrefix}_ENABLE`),
    disableRequest: makeRequestReducer(`${actionPrefix}_DISABLE`),
    updateRequest: makeRequestReducer(`${actionPrefix}_UPDATE`),
  });
};

export default alertingReducer('ENVIRONMENT_ALERTING');
