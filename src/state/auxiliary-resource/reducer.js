import { combineReducers } from 'redux';
import { restartReducer } from '../restart-utils/reducer';

export default combineReducers({
  restartRequest: restartReducer('AUXILIARY_RESOURCE'),
});
