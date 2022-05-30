import actionTypes from './action-types';
import { SubscriptionsActionTypes } from '../subscriptions/action-types';
import { PipelineRunTaskStepModelNormalizer } from '../../models/pipeline-run-task-step/normalizer';

const initialState = [];

export const pipelineRunTaskStepsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PIPELINE_RUN_TASK_STEPS_SNAPSHOT:
      return action.payload?.map(PipelineRunTaskStepModelNormalizer) || state;

    case SubscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'PIPELINE_RUN_TASK_STEPS'
        ? initialState
        : state;

    default:
      return state;
  }
};

export default pipelineRunTaskStepsReducer;
