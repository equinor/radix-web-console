import actionTypes from './action-types';
import subscriptionsActionTypes from '../subscriptions/action-types';

const initialState = null;

export const pipelineRunTaskStepLogReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PIPELINE_RUN_TASK_STEP_LOG_SNAPSHOT:
      return action.payload || state;

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'PIPELINE_RUN_TASK_STEP_LOG'
        ? initialState
        : state;

    default:
      return state;
  }
};

export default pipelineRunTaskStepLogReducer;
