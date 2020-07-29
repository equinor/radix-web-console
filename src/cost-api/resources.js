import * as applicationCost from './resource-application-cost';

import { getJson, getText } from './api-helpers';

// NB: The keys here must match the Redux action prefixes for the resources in
// the /state/{resource}/action-types.js files
export default {
  APP_COST: applicationCost,
};

export const subscribe = async (resourceUrl, type = 'json') => {
  if (type === 'json') {
    return await getJson(resourceUrl);
  } else {
    return await getText(resourceUrl);
  }
};

export const unsubscribe = (resourceUrl) => {
  return; // noop in REST model
};
