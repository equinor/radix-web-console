export const makeUrl = (appName) => {
  const encodedAppName = encodeURIComponent(appName);
  return `/applications/${encodedAppName}/alerting`;
};

const regexp = new RegExp('^/applications/([^/]+)/alerting$');
export const urlMatches = (resource) => resource.match(regexp);
