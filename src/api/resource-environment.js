export const makeUrl = (appName, envName) => {
  const encodedAppName = encodeURIComponent(appName);
  const encodedEnvName = encodeURIComponent(envName);
  return `/applications/${encodedAppName}/environments/${encodedEnvName}`;
};

const regexp = new RegExp('^/applications/([^/]+)/environments/([^/]+)$');
export const urlMatches = resource => resource.match(regexp);
