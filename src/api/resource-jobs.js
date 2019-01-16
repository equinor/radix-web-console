export const makeUrl = (appName, jobName) => {
  const encAppName = encodeURIComponent(appName);

  return `/applications/${encAppName}/jobs`;
};

const regexp = new RegExp('^/applications/[^/]+/jobs$');

export const urlMatches = resource => resource.match(regexp);
