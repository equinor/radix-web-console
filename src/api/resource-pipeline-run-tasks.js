export const makeUrl = (appName, jobName, pipelineRunName) => {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);
  const encPipelineRunName = encodeURIComponent(pipelineRunName);

  return `/applications/${encAppName}/jobs/${encJobName}/pipelineruns/${encPipelineRunName}/tasks`;
};

const regexp = new RegExp(
  '^/applications/[^/]+/jobs/[^/]+/pipelineruns/[^/]+/tasks$'
);

export const urlMatches = (resource) => resource.match(regexp);
