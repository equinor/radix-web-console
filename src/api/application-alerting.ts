import { createRadixApiUrl } from './api-config';
import { postJsonWithoutBody, putJson } from './api-helpers';
import { apiResources } from './resources';

import {
  AlertingConfigModel,
  UpdateAlertingConfigModel,
} from '../models/alerting';
import { RawModel } from '../models/model-types';

export const api = {
  enableAlerting: async ({
    appName,
  }: {
    appName: string;
  }): Promise<RawModel<AlertingConfigModel>> => {
    const encAppName = encodeURIComponent(appName);

    return await postJsonWithoutBody(
      createRadixApiUrl(
        `${apiResources.APPLICATION_ALERTING.makeUrl(encAppName)}/enable`
      )
    );
  },

  disableAlerting: async ({
    appName,
  }: {
    appName: string;
  }): Promise<RawModel<AlertingConfigModel>> => {
    const encAppName = encodeURIComponent(appName);

    return await postJsonWithoutBody(
      createRadixApiUrl(
        `${apiResources.APPLICATION_ALERTING.makeUrl(encAppName)}/disable`
      )
    );
  },

  updateAlerting: async ({
    appName,
    request,
  }: {
    appName: string;
    request: UpdateAlertingConfigModel;
  }): Promise<RawModel<AlertingConfigModel>> => {
    const encAppName = encodeURIComponent(appName);

    return await putJson(
      createRadixApiUrl(
        `${apiResources.APPLICATION_ALERTING.makeUrl(encAppName)}`
      ),
      JSON.stringify(request)
    );
  },
};
