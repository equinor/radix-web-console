import axios, { AxiosInstance } from 'axios';

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