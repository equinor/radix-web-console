import actionTypes from './action-types';
import { SubscriptionsActionTypes } from '../subscriptions/action-types';
import { PipelineRunTaskModelNormalizer } from '../../models/pipeline-run-task/normalizer';

const initialState = null;

export const pipelineRunTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PIPELINE_RUN_TASK_SNAPSHOT:
      return PipelineRunTaskModelNormalizer(action.payload);

    case SubscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'PIPELINE_RUN_TASK' ? initialState : state;

    default:
      return state;
  }
};

export default pipelineRunTaskReducer;
