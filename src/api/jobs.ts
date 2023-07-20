import { createRadixApiUrl } from './api-config';
import { deleteJson, postJson } from './api-helpers';

import { RawModel } from '../models/model-types';
import { JobSummaryModel } from '../models/radix-api/jobs/job-summary';
import { ScheduledJobRequestModel } from '../models/radix-api/environments/scheduled-job-request';
import { ScheduledBatchRequestModel } from '../models/radix-api/environments/scheduled-batch-request';

export type PipelineNames = 'build' | 'build-deploy' | 'deploy' | 'promote';

// build, build-deploy parameters
export interface PipelineParametersBuild {
  branch: string;
  commitID: string;
  pushImage: string;
  triggeredBy?: string;
  imageRepository?: string;
  imageName?: string;
  imageTag?: string;
  selectedBranch: string;
  branchFullName: string;
}

// deploy parameters
export interface PipelineParametersDeploy {
  toEnvironment: string;
  imageTagNames?: Array<string>;
  triggeredBy?: string;
}

// promote parameters
export interface PipelineParametersPromote {
  deploymentName: string;
  fromEnvironment: string;
  toEnvironment: string;
  triggeredBy?: string;
}

const apiPaths = {
  apps: '/applications',
};

export async function createJob<T extends PipelineNames>({
  appName,
  pipelineName,
  ...params
}: {
  appName: string;
  pipelineName: T;
} & ([T] extends ['build' | 'build-deploy']
  ? PipelineParametersBuild
  : [T] extends ['deploy']
  ? PipelineParametersDeploy
  : [T] extends ['promote']
  ? PipelineParametersPromote
  : {})): Promise<RawModel<JobSummaryModel>> {
  const encAppName = encodeURIComponent(appName);
  const encPipelineName = encodeURIComponent(pipelineName);

  return await postJson<RawModel<JobSummaryModel>>(
    createRadixApiUrl(
      `${apiPaths.apps}/${encAppName}/pipelines/${encPipelineName}`
    ),
    null,
    JSON.stringify(params)
  );
}

export async function deleteBatch(
  appName: string,
  envName: string,
  jobComponentName: string,
  batchName: string
): Promise<void> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encBatchName = encodeURIComponent(batchName);

  return await deleteJson(
    createRadixApiUrl(
      `${apiPaths.apps}/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/batches/${encBatchName}`
    )
  );
}

export async function stopBatch(
  appName: string,
  envName: string,
  jobComponentName: string,
  batchName: string
): Promise<void> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encBatchName = encodeURIComponent(batchName);

  return await postJson<void, never>(
    createRadixApiUrl(
      `${apiPaths.apps}/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/batches/${encBatchName}/stop`
    )
  );
}

export async function restartBatch(
  appName: string,
  envName: string,
  jobComponentName: string,
  batchName: string
): Promise<void> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encBatchName = encodeURIComponent(batchName);

  return await postJson<void, never>(
    createRadixApiUrl(
      `${apiPaths.apps}/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/batches/${encBatchName}/restart`
    )
  );
}

export async function copyBatch(
  appName: string,
  envName: string,
  jobComponentName: string,
  batchName: string,
  request: ScheduledBatchRequestModel
): Promise<RawModel<ScheduledBatchRequestModel>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encBatchName = encodeURIComponent(batchName);

  return await postJson<RawModel<ScheduledBatchRequestModel>>(
    createRadixApiUrl(
      `${apiPaths.apps}/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/batches/${encBatchName}/copy`
    ),
    null,
    JSON.stringify(request)
  );
}

export async function deleteJob(
  appName: string,
  envName: string,
  jobComponentName: string,
  jobName: string
): Promise<void> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encJobName = encodeURIComponent(jobName);

  return await deleteJson(
    createRadixApiUrl(
      `${apiPaths.apps}/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/jobs/${encJobName}`
    )
  );
}

export async function stopJob(
  appName: string,
  envName: string,
  jobComponentName: string,
  jobName: string
): Promise<void> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encJobName = encodeURIComponent(jobName);

  return await postJson<void, never>(
    createRadixApiUrl(
      `${apiPaths.apps}/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/jobs/${encJobName}/stop`
    )
  );
}

export async function restartJob(
  appName: string,
  envName: string,
  jobComponentName: string,
  jobName: string
): Promise<void> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encJobName = encodeURIComponent(jobName);

  return await postJson<void, never>(
    createRadixApiUrl(
      `${apiPaths.apps}/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/jobs/${encJobName}/restart`
    )
  );
}

export async function copyJob(
  appName: string,
  envName: string,
  jobComponentName: string,
  jobName: string,
  request: ScheduledJobRequestModel
): Promise<RawModel<ScheduledJobRequestModel>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encJobName = encodeURIComponent(jobName);

  return await postJson<RawModel<ScheduledJobRequestModel>>(
    createRadixApiUrl(
      `${apiPaths.apps}/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/jobs/${encJobName}/copy`
    ),
    null,
    JSON.stringify(request)
  );
}
