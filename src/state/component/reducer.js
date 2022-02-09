import { combineReducers } from 'redux';
import { restartReducer } from '../restart-utils/reducer';
import { startReducer } from '../start-utils/reducer';

import { stopReducer } from '../stop-utils/reducer';

export default combineReducers({
  startRequest: startReducer('COMPONENT'),
  stopRequest: stopReducer('COMPONENT'),
  restartRequest: restartReducer('COMPONENT'),
});
