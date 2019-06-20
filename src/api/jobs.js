import { postJson } from './api-helpers';

const apiPaths = {
  apps: '/applications',
};

export async function createJob({ appName, pipelineName, ...jobParams }) {
  return await postJson(
    `${apiPaths.apps}/${appName}/pipelines/${pipelineName}`,
    jobParams,
    'radix_api'
  );
}
