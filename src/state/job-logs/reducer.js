import actionTypes from './action-types';
import { SubscriptionsActionTypes } from '../subscriptions/action-types';

const initialState = {};

export const jobLogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JOB_LOGS_SNAPSHOT: {
      const newState = {};
      action.payload.forEach((component) => {
        newState[component.name] = component;
      });
      return newState;
    }

    case SubscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'JOB_LOGS' ? initialState : state;

    default:
      return state;
  }
};

export default jobLogsReducer;
