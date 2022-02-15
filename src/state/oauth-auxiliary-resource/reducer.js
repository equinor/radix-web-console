import { combineReducers } from 'redux';
import { restartReducer } from '../restart-base/reducer';

export default combineReducers({
  restartRequest: restartReducer('OAUTH_AUXILIARY_RESOURCE'),
});
