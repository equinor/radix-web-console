import { combineReducers } from 'redux';
import requestStates from '../state-utils/request-states';

const initialState = {
  status: requestStates.IDLE,
  payload: null,
  lastError: '',
};

const componentRestartRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COMPONENT_RESTART_REQUEST':
      return {
        status: requestStates.IN_PROGRESS,
        payload: null,
        lastError: '',
      };

    case 'COMPONENT_RESTART_COMPLETE':
      return {
        status: requestStates.SUCCESS,
        payload: action.payload,
        lastError: '',
      };

    case 'COMPONENT_RESTART_FAIL':
      return {
        status: requestStates.FAILURE,
        payload: null,
        lastError: action.error,
      };

    case 'COMPONENT_RESTART_RESET':
    case 'SUBSCRIPTIONS_REFRESH_REQUEST':
      return initialState;

    default:
      return state;
  }
};

export default combineReducers({
  componentRestartRequest: componentRestartRequestReducer,
});
