import * as application from './resource-application';
import * as applications from './resource-applications';
import * as deployments from './resource-deployments';

import { getJson } from './api-helpers';

export default {
  APP: application,
  APPS: applications,
  DEPLOYMENTS: deployments,
};

export const subscribe = async resourceUrl => {
  // TODO: replace with socket.io message dispatch
  return await getJson(resourceUrl, 'radix_api');
};

export const unsubscribe = resourceUrl => {
  // TODO: replace with socket.io message dispatch
  return; // noop in REST model
};
