import { makeRequestReducerWithSubscriptionRefresh } from '../state-utils/request';

export const startReducer = (actionPrefix) => {
  return makeRequestReducerWithSubscriptionRefresh(`${actionPrefix}_START`);
};
