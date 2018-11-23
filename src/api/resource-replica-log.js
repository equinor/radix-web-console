export const makeUrl = (appName, deploymentName, componentName, podName) => {
  const encAppName = encodeURIComponent(appName);
  const encDeploymentName = encodeURIComponent(deploymentName);
  const encComponentName = encodeURIComponent(componentName);
  const encPodName = encodeURIComponent(podName);

  return `/applications/${encAppName}/deployments/${encDeploymentName}/components/${encComponentName}/replicas/${encPodName}/logs`;
};

const regexp = new RegExp(
  '^/applications/[^/]+/deployments/[^/]+/components/[^/]+/replicas/[^/]+/logs$'
);

export const urlMatches = resource => resource.match(regexp);
