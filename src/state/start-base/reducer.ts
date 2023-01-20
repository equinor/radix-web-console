import { makeRequestReducerWithSubscriptionRefresh } from '../state-utils/request';

export const startReducer = (actionPrefix: string) =>
  makeRequestReducerWithSubscriptionRefresh<string>(`${actionPrefix}_START`);
