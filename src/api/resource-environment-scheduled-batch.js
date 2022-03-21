export const makeUrl = (appName, envName, jobComponentName, batchName) => {
  const encodedAppName = encodeURIComponent(appName);
  const encodedEnvName = encodeURIComponent(envName);
  const encodedJobComponentName = encodeURIComponent(jobComponentName);
  const encodedBatchName = encodeURIComponent(batchName);
  return `/applications/${encodedAppName}/environments/${encodedEnvName}/jobcomponents/${encodedJobComponentName}/batches/${encodedBatchName}`;
};

const regexp = new RegExp(
  '^/applications/([^/]+)/environments/([^/]+)/jobcomponents/([^/]+)/batches/([^/]+)$'
);
export const urlMatches = (resource) => resource.match(regexp);
