import { BaseAxiosApi } from './base-axios-api';

import { ServiceNowApplicationModel } from '../models/service-now-application';
import { ServiceNowApplicationModelNormalizer } from '../models/service-now-application/normalizer';
import { RawModel } from '../models/model-types';
import { arrayNormalizer } from '../models/model-utils';

export class ServiceNowApi extends BaseAxiosApi {
  async getApplications(
    name: string = '',
    limit: number = 25
  ): Promise<Array<ServiceNowApplicationModel>> {
    const params = new URLSearchParams();
    if (name) {
      params.append('name', name);
    }
    if (limit > 0) {
      params.append('limit', limit.toString());
    }

    const apps = await this.get<Array<ServiceNowApplicationModel>>(
      `applications?${params.toString()}`
    );

    return arrayNormalizer(apps, ServiceNowApplicationModelNormalizer);
  }

  async getApplication(id: string): Promise<ServiceNowApplicationModel> {
    const encId = encodeURIComponent(id);

    const app = await this.get<RawModel<ServiceNowApplicationModel>>(
      `applications/${encId}`
    );

    return ServiceNowApplicationModelNormalizer(app);
  }
}
