import update from 'immutability-helper';

import actionTypes from './action-types';
import streamActionTypes from '../streaming/action-types';

const actionSecretIndex = (secrets, action) =>
  secrets.findIndex(
    secret => secret.metadata.name === action.secret.metadata.name
  );

export default (state = [], action) => {
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
        secrets.filter(
          secret => secret.metadata.name !== action.secret.metadata.name
        )
      );

    default:
      return state;
  }
};
