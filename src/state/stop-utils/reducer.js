import { makeRequestReducerWithSubscriptionRefresh } from '../state-utils/request';

export const stopReducer = (actionPrefix) => {
  return makeRequestReducerWithSubscriptionRefresh(`${actionPrefix}_STOP`);
};
