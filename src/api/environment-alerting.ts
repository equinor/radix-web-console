import { createRadixApiUrl } from './api-config';
import { postJsonWithoutBody, putJson } from './api-helpers';
import { apiResources } from './resources';

import {
  AlertingConfigModel,
  UpdateAlertingConfigModel,
} from '../models/alerting';

export const api = {
  enableAlerting: async ({
    appName,
    envName,
  }: {
    appName: string;
    envName: string;
  }): Promise<AlertingConfigModel> => {
    const encAppName = encodeURIComponent(appName);
    const encEnvName = encodeURIComponent(envName);

    return await postJsonWithoutBody<AlertingConfigModel>(
      createRadixApiUrl(
        `${apiResources.ENVIRONMENT_ALERTING.makeUrl(
          encAppName,
          encEnvName
        )}/enable`
      )
    );
  },

  disableAlerting: async ({
    appName,
    envName,
  }: {
    appName: string;
    envName: string;
  }): Promise<AlertingConfigModel> => {
    const encAppName = encodeURIComponent(appName);
    const encEnvName = encodeURIComponent(envName);

    return await postJsonWithoutBody<AlertingConfigModel>(
      createRadixApiUrl(
        `${apiResources.ENVIRONMENT_ALERTING.makeUrl(
          encAppName,
          encEnvName
        )}/disable`
      )
    );
  },

  updateAlerting: async ({
    appName,
    envName,
    request,
  }: {
    appName: string;
    envName: string;
    request: UpdateAlertingConfigModel;
  }): Promise<AlertingConfigModel> => {
    const encAppName = encodeURIComponent(appName);
    const encEnvName = encodeURIComponent(envName);

    return await putJson<AlertingConfigModel>(
      createRadixApiUrl(
        `${apiResources.ENVIRONMENT_ALERTING.makeUrl(encAppName, encEnvName)}`
      ),
      JSON.stringify(request)
    );
  },
};
