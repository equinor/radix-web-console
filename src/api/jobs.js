import { postJson } from './api-helpers';

const apiPaths = {
  apps: '/applications',
};

export async function createJob(job) {
  const jobRequest = {
    branch: job.branch,
  };

  return await postJson(
    `${apiPaths.apps}/${job.appName}/pipelines/${job.pipelineName}`,
    jobRequest,
    'radix_api'
  );
}
