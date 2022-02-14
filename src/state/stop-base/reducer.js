import { makeRequestReducerWithSubscriptionRefresh } from '../state-utils/request';

export const stopReducer = (actionPrefix) =>
  makeRequestReducerWithSubscriptionRefresh(`${actionPrefix}_STOP`);
