import { ServiceNowApplication } from '../models/servicenow';
import { BaseAxiosApi } from './base-axios-api';

export class ServiceNowApi extends BaseAxiosApi {
  getApplications(name: string = '', limit: number = 25) {
    const params = new URLSearchParams();
    if (name) {
      params.append('name', name);
    }
    if (limit > 0) {
      params.append('limit', limit.toString());
    }

    return this.get<Array<ServiceNowApplication>>(
      `applications?${params.toString()}`
    );
  }
  getApplication(id: string) {
    const encId = encodeURIComponent(id);
    return this.get<ServiceNowApplication>(`applications/${encId}`);
  }
}
