export const makeUrl = (appName, jobName) => {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);

  return `/applications/${encAppName}/jobs/${encJobName}/pipelineruns`;
};

const regexp = new RegExp('^/applications/[^/]+/jobs/[^/]+/pipelineruns$');

export const urlMatches = (resource) => resource.match(regexp);
