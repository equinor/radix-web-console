import requestStates from '../state-utils/request-states';

export const isRefreshing = (state) =>
  state.subscriptionCostApiRefresh.status === requestStates.IN_PROGRESS;
