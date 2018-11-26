export const makeUrl = (appName, envName) =>
  `/applications/${encodeURIComponent(
    appName
  )}/environments/${encodeURIComponent(envName)}/deployments`;

const regexp = new RegExp(
  '^/applications/([^/]+)/environments/([^/]+)/deployments$'
);
export const urlMatches = resource => resource.match(regexp);
