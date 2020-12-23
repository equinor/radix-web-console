export const makeUrl = (appName, envName) => {
  const encodedAppName = encodeURIComponent(appName);
  const encodedEnvName = encodeURIComponent(envName);
  return `/applications/${encodedAppName}/environments/${encodedEnvName}/events`;
};

const regexp = new RegExp(
  '^/applications/([^/]+)/environments/([^/]+)/events$'
);
export const urlMatches = (resource) => resource.match(regexp);
