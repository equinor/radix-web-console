import update from 'immutability-helper';

import actionTypes from './action-types';
import streamActionTypes from '../streaming/action-types';

const actionPodIndex = (pods, action) =>
  pods.findIndex(pod => pod.metadata.name === action.pod.metadata.name);

export default (state = [], action) => {
  switch (action.type) {
    case streamActionTypes.STREAM_CONNECT:
    case streamActionTypes.STREAM_DISCONNECT:
      return action.streamKey === 'pods' ? [] : state;

    case actionTypes.PODS_LIST_ADD:
      let idx = actionPodIndex(state, action);
      if (idx === -1) {
        return update(state, { $push: [action.pod] });
      }
      return update(state, { $splice: [[idx, 1, action.pod]] });

    case actionTypes.PODS_LIST_REMOVE:
      return update(state, pods =>
        pods.filter(pod => pod.metadata.name !== action.pod.metadata.name)
      );

    default:
      return state;
  }
};
