import requestStates from '../state-utils/request-states';
import get from 'lodash/get';

export const isLoading = (state, resource) =>
  get(state, ['subscriptions', 'streams', resource, 'isLoading'], false);

export const isRefreshing = state =>
  state.subscriptions.status.status === requestStates.IN_PROGRESS;
