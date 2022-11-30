import { createRadixApiUrl } from './api-config';
import { postJsonWithoutBody, putJson } from './api-helpers';
import { apiResources } from './resources';

export const api = {
  enableAlerting: async ({ appName }) => {
    return await postJsonWithoutBody(
      createRadixApiUrl(
        `${apiResources.APPLICATION_ALERTING.makeUrl(appName)}/enable`
      )
    );
  },

  disableAlerting: async ({ appName }) => {
    return await postJsonWithoutBody(
      createRadixApiUrl(
        `${apiResources.APPLICATION_ALERTING.makeUrl(appName)}/disable`
      )
    );
  },

  updateAlerting: async ({ appName, request }) => {
    return await putJson(
      createRadixApiUrl(
        `${apiResources.APPLICATION_ALERTING.makeUrl(appName)}`
      ),
      request
    );
  },
};
