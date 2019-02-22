import get from 'lodash/get';
import requestStates from '../state-utils/request-states';

export const isLoading = (state, resource) =>
  get(state, ['subscriptions', 'streams', resource, 'isLoading'], false);

export const isRefreshing = state =>
  state.subscriptions.status.status === requestStates.IN_PROGRESS;
