// TODO: Consider the need for "deploymentName" since it's not really used by the API server

// export const makeUrl = (appName, deploymentName, componentName, podName) => {
export const makeUrl = (appName, componentName, podName) => {
  const encAppName = encodeURIComponent(appName);
  // const encDeploymentName = encodeURIComponent(deploymentName);
  const encComponentName = encodeURIComponent(componentName);
  const encPodName = encodeURIComponent(podName);

  // return `/applications/${encAppName}/deployments/${encDeploymentName}/components/${encComponentName}/replicas/${encPodName}/logs`;

  return `/applications/${encAppName}/deployments/DUMMY_DEPLOYMENT/components/${encComponentName}/replicas/${encPodName}/logs`;
};

const regexp = new RegExp(
  // '^/applications/[^/]+/deployments/[^/]+/components/[^/]+/replicas/[^/]+/logs$'
  '^/applications/[^/]+/deployments/DUMMY_DEPLOYMENT/components/[^/]+/replicas/[^/]+/logs$'
);

export const urlMatches = resource => resource.match(regexp);
