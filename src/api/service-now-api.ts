import { BaseAxiosApi } from './base-axios-api';

import { RawModel } from '../models/model-types';
import { arrayNormalizer } from '../models/model-utils';
import { ApplicationModel } from '../models/servicenow-api/models/service-now-application';
import { ApplicationModelNormalizer } from '../models/servicenow-api/models/service-now-application/normalizer';

export class ServiceNowApi extends BaseAxiosApi {
  async getApplications(
    name = '',
    limit = 0
  ): Promise<Array<ApplicationModel>> {
    const params = new URLSearchParams();
    if (name) {
      params.append('name', name);
    }
    if (limit > 0) {
      params.append('limit', limit.toString());
    }

    const apps = await this.get<RawModel<Array<ApplicationModel>>>(
      `applications?${params.toString()}`
    );

    return arrayNormalizer(apps, ApplicationModelNormalizer);
  }

  async getApplication(id: string): Promise<ApplicationModel> {
    const encId = encodeURIComponent(id);

    const app = await this.get<RawModel<ApplicationModel>>(
      `applications/${encId}`
    );

    return ApplicationModelNormalizer(app);
  }
}
