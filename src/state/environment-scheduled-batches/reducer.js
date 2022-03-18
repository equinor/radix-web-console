import actionTypes from './action-types';
import { ScheduledBatchSummaryModelNormalizer } from '../../models/scheduled-batch-summary/normalizer';
import subscriptionsActionTypes from '../subscriptions/action-types';

const initialState = null;

export const environmentScheduledBatchesReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionTypes.ENVIRONMENT_SCHEDULED_BATCHES_SNAPSHOT:
      return action.payload.map(ScheduledBatchSummaryModelNormalizer);

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'ENVIRONMENT_SCHEDULED_BATCHES'
        ? initialState
        : state;

    default:
      return state;
  }
};

export default environmentScheduledBatchesReducer;
