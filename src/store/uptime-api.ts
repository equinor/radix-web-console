import { dynatraceStoreApi as api } from './configs/index';
import { configVariables } from '../utils/config';


const radixZoneDNS = configVariables.RADIX_CLUSTER_BASE;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUptime: build.query<Result, undefined>(
      {
        query: () => "/uptime/query/" + radixZoneDNS,
      }
    ),
  }),
});

export { injectedRtkApi as msGraphApi };
export const {
  useGetUptimeQuery
} = injectedRtkApi;

type Result = Array<[number, string]>
