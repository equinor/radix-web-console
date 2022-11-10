import { createRadixApiUrl } from './api-config';
import { postJson } from './api-helpers';

import { JobSummaryModel } from '../models/job-summary';

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
  : {})): Promise<JobSummaryModel> {
  return await postJson<JobSummaryModel>(
    createRadixApiUrl(`${apiPaths.apps}/${appName}/pipelines/${pipelineName}`),
    params
  );
}
