import get from 'lodash/get';
import apiResources from '../../api/resources';

const getResourceUrl = (resource, resourceParams) => {
  return apiResources[resource]
    ? apiResources[resource].makeUrl(...resourceParams)
    : null;
};

export const isLoading = (state, resource, resourceParams = []) =>
  get(
    state,
    ['subscriptions', getResourceUrl(resource, resourceParams), 'isLoading'],
    false
  );
