import actionTypes from './action-types';

import subscriptionsActionTypes from '../subscriptions/action-types';
import jobSummaryNormaliser from '../../models/job-summary/normaliser';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JOBS_SNAPSHOT:
      return action.payload.map((job) => jobSummaryNormaliser(job));

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'JOBS' ? initialState : state;

    default:
      return state;
  }
};
