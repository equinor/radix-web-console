import axios, { AxiosInstance } from 'axios';
import { ServiceNowApplication } from '../models/servicenow';

export interface IAuthProvider {
  getAccessToken(): Promise<string>;
}

export class BaseAxiosApi {
  private client: AxiosInstance;

  constructor(baseURL: string, private authProvider?: IAuthProvider) {
    this.client = axios.create({
      baseURL: baseURL,
    });
    this.initInterceptors();
  }

  private initInterceptors() {
    if (this.authProvider) {
      this.client.interceptors.request.use(
        async (config) => {
          const token = await this.authProvider.getAccessToken();
          config.headers['Authorization'] = `Bearer ${token}`;
          return config;
        },
        (error) => Promise.reject(error)
      );
    }
  }

  protected get = async <T>(path: string) => {
    const x = await this.client.get<T>(path);
    return x.data;
  };
}

export class ServiceNowApi extends BaseAxiosApi {
  getApplications(name?: string) {
    const params = new URLSearchParams();
    if (name) {
      params.append('name', name);
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
