export const makeUrl = (appName, jobName, pipelineRunName, taskName) => {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);
  const encPipelineRunName = encodeURIComponent(pipelineRunName);
  const encTaskName = encodeURIComponent(taskName);

  return `/applications/${encAppName}/jobs/${encJobName}/pipelineruns/${encPipelineRunName}/tasks/${encTaskName}`;
};

const regexp = new RegExp(
  '^/applications/[^/]+/jobs/[^/]+/pipelineruns/[^/]+/tasks/[^/]+$'
);

export const urlMatches = (resource) => resource.match(regexp);
