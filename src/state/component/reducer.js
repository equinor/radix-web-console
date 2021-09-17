import { combineReducers } from 'redux';

import { makeRequestReducerWithSubscriptionRefresh } from '../state-utils/request';

export default combineReducers({
  componentStartRequest:
    makeRequestReducerWithSubscriptionRefresh('COMPONENT_START'),
  componentStopRequest:
    makeRequestReducerWithSubscriptionRefresh('COMPONENT_STOP'),
  componentRestartRequest:
    makeRequestReducerWithSubscriptionRefresh('COMPONENT_RESTART'),
});
