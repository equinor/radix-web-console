import { makeRequestReducerWithSubscriptionRefresh } from '../state-utils/request';

export const restartReducer = (actionPrefix) =>
  makeRequestReducerWithSubscriptionRefresh(`${actionPrefix}_RESTART`);
