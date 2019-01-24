export const makeUrl = (appName, envName) =>
  `/applications/${encodeURIComponent(appName)}/deployments`;

const regexp = new RegExp('^/applications/([^/]+)/deployments$');
export const urlMatches = resource => resource.match(regexp);
