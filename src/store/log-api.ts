import { logStoreApi as api } from './configs/index';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getComponentInventory: build.query<
      GetComponentInventoryApiResponse,
      GetComponentInventoryApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/components/${queryArg.componentName}`,
        params: { start: queryArg.start, end: queryArg.end },
      }),
    }),
    getComponentLog: build.query<
      GetComponentLogApiResponse,
      GetComponentLogApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/components/${queryArg.componentName}/log`,
        params: {
          tail: queryArg.tail,
          start: queryArg.start,
          end: queryArg.end,
          file: queryArg.file,
        },
      }),
    }),
    getComponentContainerLog: build.query<
      GetComponentContainerLogApiResponse,
      GetComponentContainerLogApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/components/${queryArg.componentName}/replicas/${queryArg.replicaName}/containers/${queryArg.containerId}/log`,
        params: {
          tail: queryArg.tail,
          start: queryArg.start,
          end: queryArg.end,
          file: queryArg.file,
        },
      }),
    }),
    getComponentReplicaLog: build.query<
      GetComponentReplicaLogApiResponse,
      GetComponentReplicaLogApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/components/${queryArg.componentName}/replicas/${queryArg.replicaName}/log`,
        params: {
          tail: queryArg.tail,
          start: queryArg.start,
          end: queryArg.end,
          file: queryArg.file,
        },
      }),
    }),
    getJobInventory: build.query<
      GetJobInventoryApiResponse,
      GetJobInventoryApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/jobs/${queryArg.jobName}`,
        params: { start: queryArg.start, end: queryArg.end },
      }),
    }),
    getJobLog: build.query<GetJobLogApiResponse, GetJobLogApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/jobs/${queryArg.jobName}/log`,
        params: {
          tail: queryArg.tail,
          start: queryArg.start,
          end: queryArg.end,
          file: queryArg.file,
        },
      }),
    }),
    getJobContainerLog: build.query<
      GetJobContainerLogApiResponse,
      GetJobContainerLogApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/jobs/${queryArg.jobName}/replicas/${queryArg.replicaName}/containers/${queryArg.containerId}/log`,
        params: {
          tail: queryArg.tail,
          start: queryArg.start,
          end: queryArg.end,
          file: queryArg.file,
        },
      }),
    }),
    getJobReplicaLog: build.query<
      GetJobReplicaLogApiResponse,
      GetJobReplicaLogApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/jobs/${queryArg.jobName}/replicas/${queryArg.replicaName}/log`,
        params: {
          tail: queryArg.tail,
          start: queryArg.start,
          end: queryArg.end,
          file: queryArg.file,
        },
      }),
    }),
    getPipelineJobInventory: build.query<
      GetPipelineJobInventoryApiResponse,
      GetPipelineJobInventoryApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/pipelinejobs/${queryArg.pipelineJobName}`,
        params: { start: queryArg.start, end: queryArg.end },
      }),
    }),
    getPipelineJobContainerLog: build.query<
      GetPipelineJobContainerLogApiResponse,
      GetPipelineJobContainerLogApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/pipelinejobs/${queryArg.pipelineJobName}/replicas/${queryArg.replicaName}/containers/${queryArg.containerId}/log`,
        params: {
          tail: queryArg.tail,
          start: queryArg.start,
          end: queryArg.end,
          file: queryArg.file,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as logApi };
export type GetComponentInventoryApiResponse =
  /** status 200 OK */ ModelsInventoryResponse;
export type GetComponentInventoryApiArg = {
  /** Application Name */
  appName: string;
  /** Environment Name */
  envName: string;
  /** Component Name */
  componentName: string;
  /** Start time */
  start?: string;
  /** End time */
  end?: string;
};
export type GetComponentLogApiResponse = unknown;
export type GetComponentLogApiArg = {
  /** Application Name */
  appName: string;
  /** Environment Name */
  envName: string;
  /** Component Name */
  componentName: string;
  /** Number of rows to return from the tail of the log */
  tail?: number;
  /** Start time */
  start?: string;
  /** End time */
  end?: string;
  /** Response as attachment */
  file?: boolean;
};
export type GetComponentContainerLogApiResponse = unknown;
export type GetComponentContainerLogApiArg = {
  /** Application Name */
  appName: string;
  /** Environment Name */
  envName: string;
  /** Component Name */
  componentName: string;
  /** Replica Name */
  replicaName: string;
  /** Container ID */
  containerId: string;
  /** Number of rows to return from the tail of the log */
  tail?: number;
  /** Start time */
  start?: string;
  /** End time */
  end?: string;
  /** Response as attachment */
  file?: boolean;
};
export type GetComponentReplicaLogApiResponse = unknown;
export type GetComponentReplicaLogApiArg = {
  /** Application Name */
  appName: string;
  /** Environment Name */
  envName: string;
  /** Component Name */
  componentName: string;
  /** Replica Name */
  replicaName: string;
  /** Number of rows to return from the tail of the log */
  tail?: number;
  /** Start time */
  start?: string;
  /** End time */
  end?: string;
  /** Response as attachment */
  file?: boolean;
};
export type GetJobInventoryApiResponse =
  /** status 200 OK */ ModelsInventoryResponse;
export type GetJobInventoryApiArg = {
  /** Application Name */
  appName: string;
  /** Environment Name */
  envName: string;
  /** Job Component Name */
  jobComponentName: string;
  /** Job Name */
  jobName: string;
  /** Start time */
  start?: string;
  /** End time */
  end?: string;
};
export type GetJobLogApiResponse = unknown;
export type GetJobLogApiArg = {
  /** Application Name */
  appName: string;
  /** Environment Name */
  envName: string;
  /** Job Component Name */
  jobComponentName: string;
  /** Job Name */
  jobName: string;
  /** Number of rows to return from the tail of the log */
  tail?: number;
  /** Start time */
  start?: string;
  /** End time */
  end?: string;
  /** Response as attachment */
  file?: boolean;
};
export type GetJobContainerLogApiResponse = unknown;
export type GetJobContainerLogApiArg = {
  /** Application Name */
  appName: string;
  /** Environment Name */
  envName: string;
  /** Job Component Name */
  jobComponentName: string;
  /** Job Name */
  jobName: string;
  /** Replica Name */
  replicaName: string;
  /** Container ID */
  containerId: string;
  /** Number of rows to return from the tail of the log */
  tail?: number;
  /** Start time */
  start?: string;
  /** End time */
  end?: string;
  /** Response as attachment */
  file?: boolean;
};
export type GetJobReplicaLogApiResponse = unknown;
export type GetJobReplicaLogApiArg = {
  /** Application Name */
  appName: string;
  /** Environment Name */
  envName: string;
  /** Job Component Name */
  jobComponentName: string;
  /** Job Name */
  jobName: string;
  /** Replica Name */
  replicaName: string;
  /** Number of rows to return from the tail of the log */
  tail?: number;
  /** Start time */
  start?: string;
  /** End time */
  end?: string;
  /** Response as attachment */
  file?: boolean;
};
export type GetPipelineJobInventoryApiResponse =
  /** status 200 OK */ ModelsInventoryResponse;
export type GetPipelineJobInventoryApiArg = {
  /** Application Name */
  appName: string;
  /** Pipeline Job Name */
  pipelineJobName: string;
  /** Start time */
  start?: string;
  /** End time */
  end?: string;
};
export type GetPipelineJobContainerLogApiResponse = unknown;
export type GetPipelineJobContainerLogApiArg = {
  /** Application Name */
  appName: string;
  /** Pipeline Job Name */
  pipelineJobName: string;
  /** Replica Name */
  replicaName: string;
  /** Container ID */
  containerId: string;
  /** Number of rows to return from the tail of the log */
  tail?: number;
  /** Start time */
  start?: string;
  /** End time */
  end?: string;
  /** Response as attachment */
  file?: boolean;
};
export type ModelsContainer = {
  creationTimestamp?: string;
  id: string;
  lastKnown?: string;
  name?: string;
};
export type ModelsReplica = {
  containers?: ModelsContainer[];
  creationTimestamp?: string;
  lastKnown?: string;
  name: string;
};
export type ModelsInventoryResponse = {
  replicas?: ModelsReplica[];
};
export type ErrorsStatus = {
  message?: string;
  reason?: string;
};
export const {
  useGetComponentInventoryQuery,
  useGetComponentLogQuery,
  useGetComponentContainerLogQuery,
  useGetComponentReplicaLogQuery,
  useGetJobInventoryQuery,
  useGetJobLogQuery,
  useGetJobContainerLogQuery,
  useGetJobReplicaLogQuery,
  useGetPipelineJobInventoryQuery,
  useGetPipelineJobContainerLogQuery,
} = injectedRtkApi;
