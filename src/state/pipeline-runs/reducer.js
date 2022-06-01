import actionTypes from './action-types';
import { SubscriptionsActionTypes } from '../subscriptions/action-types';
import { PipelineRunModelNormalizer } from '../../models/pipeline-run/normalizer';

const initialState = [];

export const pipelineRunsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PIPELINE_RUNS_SNAPSHOT:
      return action.payload?.map(PipelineRunModelNormalizer) || state;

    case SubscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'PIPELINE_RUNS' ? initialState : state;

    default:
      return state;
  }
};

export default pipelineRunsReducer;
