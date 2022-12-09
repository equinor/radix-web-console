import { createRadixApiUrl } from './api-config';
import { postJsonWithoutBody, putJson } from './api-helpers';
import { apiResources } from './resources';

export const api = {
  enableAlerting: async ({ appName, envName }) => {
    return await postJsonWithoutBody(
      createRadixApiUrl(
        `${apiResources.ENVIRONMENT_ALERTING.makeUrl(appName, envName)}/enable`
      )
    );
  },

  disableAlerting: async ({ appName, envName }) => {
    return await postJsonWithoutBody(
      createRadixApiUrl(
        `${apiResources.ENVIRONMENT_ALERTING.makeUrl(appName, envName)}/disable`
      )
    );
  },

  updateAlerting: async ({ appName, envName, request }) => {
    return await putJson(
      createRadixApiUrl(
        `${apiResources.ENVIRONMENT_ALERTING.makeUrl(appName, envName)}`
      ),
      request
    );
  },
};
