import { makeRequestReducerWithSubscriptionRefresh } from '../state-utils/request';

export const restartReducer = (actionPrefix: string) =>
  makeRequestReducerWithSubscriptionRefresh<string>(`${actionPrefix}_RESTART`);
