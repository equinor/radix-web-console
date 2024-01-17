import { createRadixApiUrl } from './api-config';
import { postJson } from './api-helpers';

import { RawModel } from '../models/model-types';
import { JobSummary } from '../store/radix-api';

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
      : {})): Promise<RawModel<JobSummary>> {
  const encAppName = encodeURIComponent(appName);
  const encPipelineName = encodeURIComponent(pipelineName);

  return await postJson<RawModel<JobSummary>>(
    createRadixApiUrl(
      `${apiPaths.apps}/${encAppName}/pipelines/${encPipelineName}`
    ),
    null,
    JSON.stringify(params)
  );
}
