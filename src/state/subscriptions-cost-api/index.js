import get from 'lodash/get';
import apiResources from '../../cost-api/resources';

const getResourceUrl = (resource, resourceParams = []) => {
  return apiResources[resource]
    ? apiResources[resource].makeUrl(...resourceParams)
    : null;
};

export const isLoading = (state, resource, resourceParams) => {
  const url = getResourceUrl(resource, resourceParams);
  return get(state, ['subscriptionsCostApi', url, 'isLoading'], false);
};

export const hasData = (state, resource, resourceParams) => {
  const url = getResourceUrl(resource, resourceParams);
  return get(state, ['subscriptionsCostApi', url, 'hasData'], false);
};

export const getError = (state, resource, resourceParams) => {
  const url = getResourceUrl(resource, resourceParams);
  return get(state, ['subscriptionsCostApi', url, 'error']);
};
