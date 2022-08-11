import { createRadixApiUrl } from './api-config';
import { postJsonWithoutBody, putJson } from './api-helpers';
import { makeUrl } from './resource-environment-alerting';

export const api = {
  enableAlerting: async ({ appName, envName }) => {
    return await postJsonWithoutBody(
      createRadixApiUrl(`${makeUrl(appName, envName)}/enable`)
    );
  },

  disableAlerting: async ({ appName, envName }) => {
    return await postJsonWithoutBody(
      createRadixApiUrl(`${makeUrl(appName, envName)}/disable`)
    );
  },

  updateAlerting: async ({ appName, envName, request }) => {
    return await putJson(
      createRadixApiUrl(`${makeUrl(appName, envName)}`),
      request
    );
  },
};
