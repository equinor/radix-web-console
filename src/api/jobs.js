import { createRadixApiUrl } from './api-config';
import { postJson } from './api-helpers';

const apiPaths = {
  apps: '/applications',
};

export async function createJob({ appName, pipelineName, ...jobParams }) {
  return await postJson(
    createRadixApiUrl(`${apiPaths.apps}/${appName}/pipelines/${pipelineName}`),
    jobParams
  );
}
