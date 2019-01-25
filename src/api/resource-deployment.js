export const makeUrl = (appName, deploymentName) => {
  const encAppName = encodeURIComponent(appName);
  const encDeploymentName = encodeURIComponent(deploymentName);

  return `/applications/${encAppName}/deployments/${encDeploymentName}`;
};

const regexp = new RegExp('^/applications/[^/]+/deployments/[^/]+$');

export const urlMatches = resource => resource.match(regexp);
