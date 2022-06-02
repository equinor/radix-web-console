import actionTypes from './action-types';
import { SubscriptionsActionTypes } from '../subscriptions/action-types';
import { JobModelNormalizer } from '../../models/job/normalizer';

const initialState = null;

export const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JOB_SNAPSHOT: {
      return JobModelNormalizer(action.payload);
    }

    case SubscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'JOB' ? initialState : state;

    default:
      return state;
  }
};

export default jobReducer;
