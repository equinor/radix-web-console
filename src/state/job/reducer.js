import actionTypes from './action-types';
import subscriptionsActionTypes from '../subscriptions/action-types';
import jobNormaliser from '../../models/job/normaliser';

const initialState = null;

export const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JOB_SNAPSHOT: {
      return jobNormaliser(action.payload);
    }

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'JOB' ? initialState : state;

    default:
      return state;
  }
};

export default jobReducer;
