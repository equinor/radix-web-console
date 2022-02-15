import { makeRequestReducerWithSubscriptionRefresh } from '../state-utils/request';

export const startReducer = (actionPrefix) =>
  makeRequestReducerWithSubscriptionRefresh(`${actionPrefix}_START`);
