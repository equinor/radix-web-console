import update from 'immutability-helper';
import { combineReducers } from 'redux';

import actionTypes from './action-types';
import streamActionTypes from '../streaming/action-types';
import { makeRequestReducer } from '../state-utils/request';

const actionSecretIndex = (secrets, action) =>
  secrets.findIndex(
    secret => secret.metadata.name === action.secret.metadata.name
  );

const secretsReducer = (state = [], action) => {
  switch (action.type) {
    case streamActionTypes.STREAM_CONNECT:
    case streamActionTypes.STREAM_DISCONNECT:
      return action.streamKey === 'secrets' ? [] : state;

    case actionTypes.SECRETS_LIST_ADD:
      let idx = actionSecretIndex(state, action);
      if (idx === -1) {
        return update(state, { $push: [action.secret] });
      }
      return update(state, { $splice: [[idx, 1, action.secret]] });

    case actionTypes.SECRETS_LIST_REMOVE:
      return update(state, secrets =>
        secrets.filter(secret => secret.metadata.name !== action.name)
      );

    default:
      return state;
  }
};

export default combineReducers({
  clusterSecrets: secretsReducer,
  save: makeRequestReducer('SECRETS_SAVE'),
});
