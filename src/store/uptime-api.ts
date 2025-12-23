import {  uptimeApi } from './configs/index';
import { configVariables } from '../utils/config';

const injectedRtkApi = uptimeApi.injectEndpoints({
  endpoints: (build) => ({
    getUptime: build.query<Result, void >(
      {
        query: () => "/query/" + configVariables.RADIX_DNS_ZONE,
      }
    ),
  }),
});

export { injectedRtkApi as msGraphApi };
export const {
  useGetUptimeQuery
} = injectedRtkApi;

type Result = Array<[number, string]>
