export const makeUrl = (appName, envName, componentName, envVarName) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);
  const encEnvVarName = encodeURIComponent(envVarName);
  return `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/envvars/${envVarName}`;
};

const regexp = new RegExp(
  '^/applications/([^/]+)/environments/([^/]+)/components/([^/]+)/envvars/([^/]+)$'
);

export const urlMatches = (resource) => resource.match(regexp);
