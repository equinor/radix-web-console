import { postJsonWithNoBody, putJson } from './api-helpers';
import { makeUrl } from './resource-environment-alerting';

export const api = {
  enableAlerting: async ({ appName, envName }) => {
    return await postJsonWithNoBody(`${makeUrl(appName, envName)}/enable`);
  },

  disableAlerting: async ({ appName, envName }) => {
    return await postJsonWithNoBody(`${makeUrl(appName, envName)}/disable`);
  },

  updateAlerting: async ({ appName, envName, request }) => {
    return await putJson(`${makeUrl(appName, envName)}`, request);
  },
};
