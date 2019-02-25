import actionTypes from './action-types';
import subscriptionsActionTypes from '../subscriptions/action-types';

import { JobSummaryNormaliser } from '../../models';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JOBS_SNAPSHOT:
      return action.payload.map(job => JobSummaryNormaliser(job));

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'JOBS' ? initialState : state;

    default:
      return state;
  }
};
