import update from 'immutability-helper';

import actionTypes from './action-types';
import requestStates from '../state-utils/request-states';

const initialState = {};

export const secretsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SECRETS_SAVE_RESET:
      return initialState;

    case actionTypes.SECRETS_SAVE_REQUEST:
      return update(state, {
        $set: { [action.secretName]: { status: requestStates.IN_PROGRESS } },
      });

    case actionTypes.SECRETS_SAVE_COMPLETE:
      return update(state, {
        $set: { [action.secretName]: { status: requestStates.SUCCESS } },
      });

    case actionTypes.SECRETS_SAVE_FAIL:
      return update(state, {
        $set: {
          [action.secretName]: {
            status: requestStates.FAILURE,
            error: action.error,
          },
        },
      });

    default:
      return state;
  }
};

export default secretsReducer;
