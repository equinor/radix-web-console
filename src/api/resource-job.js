export const makeUrl = (appName, jobName) => {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);

  return `/applications/${encAppName}/jobs/${encJobName}`;
};

const regexp = new RegExp('^/applications/[^/]+/jobs/[^/]+$');

export const urlMatches = (resource) => resource.match(regexp);
