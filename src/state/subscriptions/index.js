import requestStates from '../state-utils/request-states';

export const isRefreshing = state =>
  state.subscriptions.status.status === requestStates.IN_PROGRESS;
