import { postJsonWithNoBody, putJson } from './api-helpers';
import { makeUrl } from './resource-application-alerting';

export const api = {
  enableAlerting: async ({ appName }) => {
    return await postJsonWithNoBody(`${makeUrl(appName)}/enable`);
  },

  disableAlerting: async ({ appName }) => {
    return await postJsonWithNoBody(`${makeUrl(appName)}/disable`);
  },

  updateAlerting: async ({ appName, request }) => {
    return await putJson(`${makeUrl(appName)}`, request);
  },
};
