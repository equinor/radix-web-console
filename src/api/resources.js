import * as application from './resource-application';
import * as applications from './resource-applications';

import { getJson } from './api-helpers';

export default {
  APP: application,
  APPS: applications,
};

export const subscribe = async resourceUrl => {
  // TODO: replace with socket.io message dispatch
  return await getJson(resourceUrl);
};
