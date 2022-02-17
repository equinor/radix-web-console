import update from 'immutability-helper';

import actionTypes from './action-types';

import { RequestState } from '../state-utils/request-states';

const initialState = {};

export const secretsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SECRETS_SAVE_RESET:
      return initialState;

    case actionTypes.SECRETS_SAVE_REQUEST:
      return update(state, {
        $set: { [action.secretName]: { status: RequestState.IN_PROGRESS } },
      });

    case actionTypes.SECRETS_SAVE_COMPLETE:
      return update(state, {
        $set: { [action.secretName]: { status: RequestState.SUCCESS } },
      });

    case actionTypes.SECRETS_SAVE_FAIL:
      return update(state, {
        $set: {
          [action.secretName]: {
            status: RequestState.FAILURE,
            error: action.error,
          },
        },
      });

    default:
      return state;
  }
};

export default secretsReducer;
