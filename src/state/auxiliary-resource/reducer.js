import { combineReducers } from 'redux';
import { restartReducer } from '../restart-utils/reducer';

export default combineReducers({
  restartRequest: restartReducer('AUX_RESOURCE'),
});
