import { scanApi as api } from './configs/index';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApplicationVulnerabilitySummaries: build.query<
      GetApplicationVulnerabilitySummariesApiResponse,
      GetApplicationVulnerabilitySummariesApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/vulnerabilities/${queryArg.appName}`,
      }),
    }),
    getEnvironmentVulnerabilitySummary: build.query<
      GetEnvironmentVulnerabilitySummaryApiResponse,
      GetEnvironmentVulnerabilitySummaryApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}`,
      }),
    }),
    getComponentVulnerabilities: build.query<
      GetComponentVulnerabilitiesApiResponse,
      GetComponentVulnerabilitiesApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/components/${queryArg.componentName}`,
      }),
    }),
    getJobVulnerabilities: build.query<
      GetJobVulnerabilitiesApiResponse,
      GetJobVulnerabilitiesApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobs/${queryArg.jobName}`,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as scanApi };
export type GetApplicationVulnerabilitySummariesApiResponse =
  /** status 200 Successful get vulnerability summaries for application */ ApplicationVulnerabilities;
export type GetApplicationVulnerabilitySummariesApiArg = {
  /** Name of the application */
  appName: string;
};
export type GetEnvironmentVulnerabilitySummaryApiResponse =
  /** status 200 Successful get vulnerability summary for application */ EnvironmentVulnerabilities;
export type GetEnvironmentVulnerabilitySummaryApiArg = {
  /** Name of the application */
  appName: string;
  /** Name of the environment */
  envName: string;
};
export type GetComponentVulnerabilitiesApiResponse =
  /** status 200 Successful get vulnerabilities for a component */ ImageWithLastScan;
export type GetComponentVulnerabilitiesApiArg = {
  /** Name of the application */
  appName: string;
  /** Name of the environment */
  envName: string;
  /** Name of the component */
  componentName: string;
};
export type GetJobVulnerabilitiesApiResponse =
  /** status 200 Successful get vulnerabilities for a job */ ImageWithLastScan;
export type GetJobVulnerabilitiesApiArg = {
  /** Name of the application */
  appName: string;
  /** Name of the environment */
  envName: string;
  /** Name of the job */
  jobName: string;
};
export type Image = {
  baseImage?: string;
  image: string;
};
export type Vulnerability = {
  cve?: string[];
  cvss?: number;
  cwe?: string[];
  description?: string;
  packageName: string;
  publishedDate?: string;
  references?: string[];
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';
  title?: string;
  version: string;
};
export type ImageScan = {
  scanSuccess: boolean;
  scanTime: string;
  vulnerabilities?: Vulnerability[];
  vulnerabilitySummary?: {
    [key: string]: number;
  };
};
export type ImageWithLastScan = Image & ImageScan;
export type ComponentVulnerabilities = {
  [key: string]: ImageWithLastScan;
};
export type EnvironmentVulnerabilities = {
  components?: ComponentVulnerabilities;
  jobs?: ComponentVulnerabilities;
  name: string;
};
export type ApplicationVulnerabilities = EnvironmentVulnerabilities[];
export const {
  useGetApplicationVulnerabilitySummariesQuery,
  useGetEnvironmentVulnerabilitySummaryQuery,
  useGetComponentVulnerabilitiesQuery,
  useGetJobVulnerabilitiesQuery,
} = injectedRtkApi;
