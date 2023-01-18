import { makeRequestReducerWithSubscriptionRefresh } from '../state-utils/request';

export const stopReducer = (actionPrefix: string) =>
  makeRequestReducerWithSubscriptionRefresh<string>(`${actionPrefix}_STOP`);
