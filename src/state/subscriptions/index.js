import get from 'lodash/get';
import requestStates from '../state-utils/request-states';
import apiResources from '../../api/resources';

const getResourceUrl = (resource, resourceParams) => {
  return apiResources[resource]
    ? apiResources[resource].makeUrl(...resourceParams)
    : null;
};

export const isLoading = (state, resource, resourceParams = []) =>
  get(
    state,
    [
      'subscriptions',
      'streams',
      getResourceUrl(resource, resourceParams),
      'isLoading',
    ],
    false
  );

export const isRefreshing = state =>
  state.subscriptions.status.status === requestStates.IN_PROGRESS;
