import { createRadixApiUrl } from './api-config';
import { postJsonWithoutBody, putJson } from './api-helpers';
import { makeUrl } from './resource-application-alerting';

export const api = {
  enableAlerting: async ({ appName }) => {
    return await postJsonWithoutBody(
      createRadixApiUrl(`${makeUrl(appName)}/enable`)
    );
  },

  disableAlerting: async ({ appName }) => {
    return await postJsonWithoutBody(
      createRadixApiUrl(`${makeUrl(appName)}/disable`)
    );
  },

  updateAlerting: async ({ appName, request }) => {
    return await putJson(createRadixApiUrl(`${makeUrl(appName)}`), request);
  },
};
