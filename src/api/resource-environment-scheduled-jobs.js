export const makeUrl = (appName, envName, jobComponentName) => {
  const encodedAppName = encodeURIComponent(appName);
  const encodedEnvName = encodeURIComponent(envName);
  const encodedJobComponentName = encodeURIComponent(jobComponentName);
  return `/applications/${encodedAppName}/environments/${encodedEnvName}/jobcomponents/${encodedJobComponentName}/jobs`;
};

const regexp = new RegExp(
  '^/applications/([^/]+)/environments/([^/]+)/jobcomponents/([^/]+)/jobs$'
);
export const urlMatches = (resource) => resource.match(regexp);
