import actionTypes from './action-types';
import { ScheduledJobSummaryModelNormalizer } from '../../models/scheduled-job-summary/normalizer';
import subscriptionsActionTypes from '../subscriptions/action-types';

const initialState = null;

export const environmentScheduledJobReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionTypes.ENVIRONMENT_SCHEDULED_JOBS_SNAPSHOT:
      return action.payload?.map(ScheduledJobSummaryModelNormalizer) || state;

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'ENVIRONMENT_SCHEDULED_JOBS'
        ? initialState
        : state;

    default:
      return state;
  }
};

export default environmentScheduledJobReducer;
