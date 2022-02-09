import { makeRequestReducerWithSubscriptionRefresh } from '../state-utils/request';

export const restartReducer = (actionPrefix) => {
  return makeRequestReducerWithSubscriptionRefresh(`${actionPrefix}_RESTART`);
};
