import { combineReducers } from 'redux';
import { makeRequestReducer } from '../state-utils/request';

export default combineReducers({
  creation: makeRequestReducer('APP_CREATION'),
});
