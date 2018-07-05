import { makeActionCreator } from '../state-utils/action-creators';
import actionTypes from './action-types';

export default {
  startStreaming: makeActionCreator(actionTypes.PODS_START_STREAMING, 'app'),
  stopStreaming: makeActionCreator(actionTypes.PODS_STOP_STREAMING),
};
