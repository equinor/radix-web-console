// TODO: Consider the need for "deploymentName" since it's not really used by the API server

export const makeUrl = (
  appName,
  deploymentName,
  componentName,
  replicaName
) => {
  const encAppName = encodeURIComponent(appName);
  const encDeploymentName = encodeURIComponent(deploymentName);
  const encComponentName = encodeURIComponent(componentName);
  const encReplicaName = encodeURIComponent(replicaName);

  return `/applications/${encAppName}/deployments/${encDeploymentName}/components/${encComponentName}/replicas/${encReplicaName}/logs`;
};

const regexp = new RegExp(
  '^/applications/[^/]+/deployments/[^/]+/components/[^/]+/replicas/[^/]+/logs$'
);

export const urlMatches = resource => resource.match(regexp);
