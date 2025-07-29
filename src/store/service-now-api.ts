import { serviceNowStoreApi as api } from './configs/index';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApplications: build.query<
      GetApplicationsApiResponse,
      GetApplicationsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications`,
        params: {
          name: queryArg.name,
          include_retired: queryArg.includeRetired,
          limit: queryArg.limit,
        },
      }),
    }),
    getApplication: build.query<
      GetApplicationApiResponse,
      GetApplicationApiArg
    >({
      query: (queryArg) => ({ url: `/applications/${queryArg.appId}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as serviceNowApi };
export type GetApplicationsApiResponse =
  /** status 200 Successful operation */ Application[];
export type GetApplicationsApiArg = {
  /** Filter applications containing the provided value */
  name?: string;
  /** Includes applications with operation status = "Retired" in the result */
  includeRetired?: boolean;
  /** Number of items to return in response */
  limit?: number;
};
export type GetApplicationApiResponse =
  /** status 200 Successful operation */ Application;
export type GetApplicationApiArg = {
  /** The ServiceNow application ID */
  appId: string;
};
export type Application = {
  /** AppId is the Configuration Item of application */
  appId?: number;
  /** Description of the application */
  description?: string;
  /** Id of application
    Maps to sys_id in ServiceNow */
  id: string;
  /** Name of application */
  name: string;
  /** Deprecated: Number of application, use appId instead */
  number: number;
  /** ProductOwner of the application */
  productOwner?: string;
  /** Technical contact persons of the application */
  technicalContactPersons?: string;
};
export const { useGetApplicationsQuery, useGetApplicationQuery } =
  injectedRtkApi;
