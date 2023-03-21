import { createRadixApiUrl } from './api-config';
import { postJson, putJson } from './api-helpers';
import { apiResources } from './resources';

import {
  AlertingConfigModel,
  UpdateAlertingConfigModel,
} from '../models/alerting';
import { RawModel } from '../models/model-types';

export const api = {
  enableAlerting: async ({
    appName,
    envName,
  }: {
    appName: string;
    envName: string;
  }): Promise<RawModel<AlertingConfigModel>> => {
    const encAppName = encodeURIComponent(appName);
    const encEnvName = encodeURIComponent(envName);

    return await postJson<RawModel<AlertingConfigModel>, never>(
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
  }): Promise<RawModel<AlertingConfigModel>> => {
    const encAppName = encodeURIComponent(appName);
    const encEnvName = encodeURIComponent(envName);

    return await postJson<RawModel<AlertingConfigModel>, never>(
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
  }): Promise<RawModel<AlertingConfigModel>> => {
    const encAppName = encodeURIComponent(appName);
    const encEnvName = encodeURIComponent(envName);

    return await putJson<RawModel<AlertingConfigModel>>(
      createRadixApiUrl(
        `${apiResources.ENVIRONMENT_ALERTING.makeUrl(encAppName, encEnvName)}`
      ),
      JSON.stringify(request)
    );
  },
};
