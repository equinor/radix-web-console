export const makeUrl = (appName, envName, componentName) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);
  return `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/envvars`;
};

const regexp = new RegExp(
  '^/applications/([^/]+)/environments/([^/]+)/components/([^/]+)/envvars$'
);

export const urlMatches = (resource) => resource.match(regexp);
