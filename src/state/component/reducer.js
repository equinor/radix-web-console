import { combineReducers } from 'redux';
import requestStates from '../state-utils/request-states';

const initialState = {
  status: requestStates.IDLE,
  payload: null,
  lastError: '',
};

const componentStartRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COMPONENT_START_REQUEST':
      return {
        status: requestStates.IN_PROGRESS,
        payload: null,
        lastError: '',
      };

    case 'COMPONENT_START_COMPLETE':
      return {
        status: requestStates.SUCCESS,
        payload: action.payload,
        lastError: '',
      };

    case 'COMPONENT_START_FAIL':
      return {
        status: requestStates.FAILURE,
        payload: null,
        lastError: action.error,
      };

    case 'COMPONENT_START_RESET':
    case 'SUBSCRIPTIONS_REFRESH_REQUEST':
      return initialState;

    default:
      return state;
  }
};

const componentStopRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COMPONENT_STOP_REQUEST':
      return {
        status: requestStates.IN_PROGRESS,
        payload: null,
        lastError: '',
      };

    case 'COMPONENT_STOP_COMPLETE':
      return {
        status: requestStates.SUCCESS,
        payload: action.payload,
        lastError: '',
      };

    case 'COMPONENT_STOP_FAIL':
      return {
        status: requestStates.FAILURE,
        payload: null,
        lastError: action.error,
      };

    case 'COMPONENT_STOP_RESET':
    case 'SUBSCRIPTIONS_REFRESH_REQUEST':
      return initialState;

    default:
      return state;
  }
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
  componentStartRequest: componentStartRequestReducer,
  componentStopRequest: componentStopRequestReducer,
  componentRestartRequest: componentRestartRequestReducer,
});
