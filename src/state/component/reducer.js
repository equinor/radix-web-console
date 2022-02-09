import { combineReducers } from 'redux';
import { restartReducer } from '../restart-utils/reducer';

import { makeRequestReducerWithSubscriptionRefresh } from '../state-utils/request';

export default combineReducers({
  componentStartRequest:
    makeRequestReducerWithSubscriptionRefresh('COMPONENT_START'),
  componentStopRequest:
    makeRequestReducerWithSubscriptionRefresh('COMPONENT_STOP'),
  restartRequest: restartReducer('COMPONENT'),
});
