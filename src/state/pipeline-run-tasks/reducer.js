import actionTypes from './action-types';
import subscriptionsActionTypes from '../subscriptions/action-types';
import { PipelineRunTaskModelNormalizer } from '../../models/pipeline-run-task/normalizer';

const initialState = [];

export const pipelineRunTasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PIPELINE_RUN_TASKS_SNAPSHOT:
      return action.payload?.map(PipelineRunTaskModelNormalizer) || state;

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'PIPELINE_RUN_TASKS'
        ? initialState
        : state;

    default:
      return state;
  }
};

export default pipelineRunTasksReducer;
