export const makeUrl = (appName, envName, jobComponentName) => {
  const encodedAppName = encodeURIComponent(appName);
  const encodedEnvName = encodeURIComponent(envName);
  const encodedJobComponentName = encodeURIComponent(jobComponentName);
  return `/applications/${encodedAppName}/environments/${encodedEnvName}/jobcomponents/${encodedJobComponentName}/batches`;
};

const regexp = new RegExp(
  '^/applications/([^/]+)/environments/([^/]+)/jobcomponents/([^/]+)/batches$'
);
export const urlMatches = (resource) => resource.match(regexp);
