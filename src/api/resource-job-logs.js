export const makeUrl = (appName, jobName) => {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);

  return `/applications/${encAppName}/jobs/${encJobName}/logs`;
};

const regexp = new RegExp('^/applications/[^/]+/jobs/[^/]+/logs$');

export const urlMatches = (resource) => resource.match(regexp);
