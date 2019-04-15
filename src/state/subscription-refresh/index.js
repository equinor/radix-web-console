import requestStates from '../state-utils/request-states';

export const isRefreshing = state =>
  state.subscriptionRefresh.status === requestStates.IN_PROGRESS;
