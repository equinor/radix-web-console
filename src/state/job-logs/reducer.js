import actionTypes from './action-types';
import subscriptionsActionTypes from '../subscriptions/action-types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JOB_LOGS_SNAPSHOT: {
      const newState = {};
      action.payload.forEach(component => {
        newState[component.name] = component;
      });
      return newState;
    }

    case subscriptionsActionTypes.UNSUBSCRIBE:
      return action.resourceName === 'JOB_LOGS' ? initialState : state;

    default:
      return state;
  }
};
