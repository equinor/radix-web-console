export const makeUrl = (appName, envName, jobComponentName, jobName) => {
  const encodedAppName = encodeURIComponent(appName);
  const encodedEnvName = encodeURIComponent(envName);
  const encodedJobComponentName = encodeURIComponent(jobComponentName);
  const encodedJobName = encodeURIComponent(jobName);
  return `/applications/${encodedAppName}/environments/${encodedEnvName}/jobcomponents/${encodedJobComponentName}/jobs/${encodedJobName}`;
};

const regexp = new RegExp(
  '^/applications/([^/]+)/environments/([^/]+)/jobcomponents/([^/]+)/jobs/([^/]+)$'
);
export const urlMatches = (resource) => resource.match(regexp);
