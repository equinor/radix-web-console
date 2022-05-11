import actionTypes from './action-types';
import subscriptionsActionTypes from '../subscriptions/action-types';
import { PipelineRunSummaryModelNormalizer } from '../../models/pipeline-run-summary/normalizer';

const initialState = [];

export const pipelineRunsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PIPELINE_RUNS_SNAPSHOT:
      return action.payload?.map(PipelineRunSummaryModelNormalizer) || state;

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'PIPELINE_RUNS' ? initialState : state;

    default:
      return state;
  }
};

export default pipelineRunsReducer;
