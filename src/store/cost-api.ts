import { costApi as api } from './configs/index';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFutureCost: build.query<GetFutureCostApiResponse, GetFutureCostApiArg>({
      query: (queryArg) => ({
        url: `/futurecost/${queryArg.appName}`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getCostReport: build.query<GetCostReportApiResponse, GetCostReportApiArg>({
      query: () => ({ url: `/report` }),
    }),
    getTotalCost: build.query<GetTotalCostApiResponse, GetTotalCostApiArg>({
      query: (queryArg) => ({
        url: `/totalcost/${queryArg.appName}`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
        params: { fromTime: queryArg.fromTime, toTime: queryArg.toTime },
      }),
    }),
    getTotalCosts: build.query<GetTotalCostsApiResponse, GetTotalCostsApiArg>({
      query: (queryArg) => ({
        url: `/totalcosts`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
        params: { fromTime: queryArg.fromTime, toTime: queryArg.toTime },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as costApi };
export type GetFutureCostApiResponse =
  /** status 200 Successful get cost */ ApplicationCost;
export type GetFutureCostApiArg = {
  /** Name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of test group (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetCostReportApiResponse = unknown;
export type GetCostReportApiArg = void;
export type GetTotalCostApiResponse =
  /** status 200 Successful get cost */ ApplicationCostSet;
export type GetTotalCostApiArg = {
  /** Name of application */
  appName: string;
  /** Get cost from fromTime (example 2020-03-18 or 2020-03-18T07:20:41+01:00) */
  fromTime: string;
  /** Get cost to toTime (example 2020-09-18 or 2020-09-18T07:20:41+01:00) */
  toTime: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of test group (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetTotalCostsApiResponse =
  /** status 200 Successful get cost */ ApplicationCostSet;
export type GetTotalCostsApiArg = {
  /** Get cost from fromTime (example 2020-03-18 or 2020-03-18T07:20:41+01:00) */
  fromTime: string;
  /** Get cost to toTime (example 2020-09-18 or 2020-09-18T07:20:41+01:00) */
  toTime: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of test group (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type ApplicationCost = {
  comment?: string;
  cost: number;
  costPercentageByCpu?: number;
  costPercentageByMemory?: number;
  creator?: string;
  currency: string;
  name: string;
  owner?: string;
  wbs?: string;
};
export type ApplicationCostSet = {
  applicationCosts: ApplicationCost[];
  from: string;
  to: string;
  totalRequestedCpu?: number;
  totalRequestedMemory?: number;
};
export const {
  useGetFutureCostQuery,
  useGetCostReportQuery,
  useGetTotalCostQuery,
  useGetTotalCostsQuery,
} = injectedRtkApi;
