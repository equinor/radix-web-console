import { combineReducers } from 'redux';

import { restartReducer } from '../restart-base/reducer';
import { startReducer } from '../start-base/reducer';
import { stopReducer } from '../stop-base/reducer';

export const reducer = combineReducers({
  restartRequest: restartReducer('COMPONENT'),
  startRequest: startReducer('COMPONENT'),
  stopRequest: stopReducer('COMPONENT'),
});
export default reducer;
