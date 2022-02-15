import { combineReducers } from 'redux';
import { restartReducer } from '../restart-base/reducer';
import { startReducer } from '../start-base/reducer';

import { stopReducer } from '../stop-base/reducer';

export default combineReducers({
  startRequest: startReducer('COMPONENT'),
  stopRequest: stopReducer('COMPONENT'),
  restartRequest: restartReducer('COMPONENT'),
});
