import { makeActionCreator } from '../state-utils/action-creators';
import actionTypes from './action-types';

export default {
  startStreaming: makeActionCreator(actionTypes.SECRETS_START_STREAMING, 'app'),
  stopStreaming: makeActionCreator(actionTypes.SECRETS_STOP_STREAMING),
};
