import { scanStoreApi as api } from './configs/index';
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
  /** Base image */
  baseImage?: string;
  /** Name of image */
  image: string;
};
export type Vulnerability = {
  /** A list of CVEs referencing the vulnerability */
  cve?: string[];
  /** The CVSS value of the vulnerability */
  cvss?: number;
  /** A list of CWEs referencing the vulnerability */
  cwe?: string[];
  /** A detailed description of the vulnerability */
  description?: string;
  /** Name of the vulnerabile package */
  packageName: string;
  /** The date the vulnerability was published */
  publishedDate?: string;
  /** A list of URLs with more information about the vulnerability */
  references?: string[];
  /** The severity of the vulnerability */
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';
  /** Title of the vulnerability */
  title?: string;
  /** Version of the affected package */
  version: string;
};
export type ImageScan = {
  /** Flag indicating if scan succeeded or not */
  scanSuccess: boolean;
  /** Date and time of scan */
  scanTime: string;
  /** List of vulnerabilities */
  vulnerabilities?: Vulnerability[];
  /** Count of vulnerabilities grouped by severity */
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
  /** Name of environment */
  name: string;
};
export type ApplicationVulnerabilities = EnvironmentVulnerabilities[];
export const {
  useGetApplicationVulnerabilitySummariesQuery,
  useGetEnvironmentVulnerabilitySummaryQuery,
  useGetComponentVulnerabilitiesQuery,
  useGetJobVulnerabilitiesQuery,
} = injectedRtkApi;
