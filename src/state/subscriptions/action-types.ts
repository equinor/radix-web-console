export enum SubscriptionsActionTypes {
  SUBSCRIBE = 'SUBSCRIBE',
  UNSUBSCRIBE = 'UNSUBSCRIBE',
  SUBSCRIPTION_ENDED = 'SUBSCRIPTION_ENDED',
  SUBSCRIPTION_SUCCEEDED = 'SUBSCRIPTION_SUCCEEDED',
  SUBSCRIPTION_FAILED = 'SUBSCRIPTION_FAILED',
  SUBSCRIPTION_LOADED = 'SUBSCRIPTION_LOADED',
  SUBSCRIPTION_LOADING = 'SUBSCRIPTION_LOADING',
  REFRESH_SUBSCRIPTION = 'REFRESH_SUBSCRIPTION',
}

export type SubscriptionsActionMeta<T extends string = string> = Partial<{
  messageType: string;
  resource: string;
  resourceName: T;
  code?: number; // request status code, most likely populated if request fails
}>;
