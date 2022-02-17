import { RequestState } from '../state-utils/request-states';

export const isRefreshing = (state) =>
  state.subscriptionRefresh.status === RequestState.IN_PROGRESS;
