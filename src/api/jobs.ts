import { createRadixApiUrl } from './api-config';
import { postJson, postJsonWithoutBody } from './api-helpers';

import { JobSummaryModel } from '../models/job-summary';
import { RawModel } from '../models/model-types';

export type PipelineNames = 'build' | 'build-deploy' | 'deploy' | 'promote';

// build, build-deploy parameters
export interface PipelineParametersBuild {
  branch: string;
  selectedBranch: string;
  branchFullName: string;
  commitID: string;
  pushImage: string;
  triggeredBy?: string;
  imageRepository?: string;
  imageName?: string;
  imageTag?: string;
}

// deploy parameters
export interface PipelineParametersDeploy {
  toEnvironment: string;
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

  return await postJson(
    createRadixApiUrl(
      `${apiPaths.apps}/${encAppName}/pipelines/${encPipelineName}`
    ),
    JSON.stringify(params)
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

  return await postJsonWithoutBody(
    createRadixApiUrl(
      `${apiPaths.apps}/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/jobs/${encJobName}/stop`
    )
  );
}
