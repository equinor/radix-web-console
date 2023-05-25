import { createRadixApiUrl } from './api-config';
import { postJson, putJson } from './api-helpers';
import { apiResources } from './resources';

import { RawModel } from '../models/model-types';
import { AlertingConfigModel } from '../models/radix-api/alerting/alerting-config';
import { UpdateAlertingConfigModel } from '../models/radix-api/alerting/update-alerting-config';

export const api = {
  enableAlerting: async ({
    appName,
  }: {
    appName: string;
  }): Promise<RawModel<AlertingConfigModel>> => {
    const encAppName = encodeURIComponent(appName);

    return await postJson<RawModel<AlertingConfigModel>, never>(
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

    return await postJson<RawModel<AlertingConfigModel>, never>(
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

    return await putJson<RawModel<AlertingConfigModel>>(
      createRadixApiUrl(
        `${apiResources.APPLICATION_ALERTING.makeUrl(encAppName)}`
      ),
      null,
      JSON.stringify(request)
    );
  },
};
