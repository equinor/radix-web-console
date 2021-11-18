export const makeUrl = (appName, envName) => {
  const encodedAppName = encodeURIComponent(appName);
  const encodedEnvName = encodeURIComponent(envName);
  return `/applications/${encodedAppName}/environments/${encodedEnvName}/alerting`;
};

const regexp = new RegExp(
  '^/applications/([^/]+)/environments/([^/]+)/alerting$'
);
export const urlMatches = (resource) => resource.match(regexp);
