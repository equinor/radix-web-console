import usePollingPlain from '../../effects/use-polling-text';

const usePollLogs = (appName, deploymentName, componentName, replicaName) => {
  const encAppName = encodeURIComponent(appName);
  const encDeployName = encodeURIComponent(deploymentName);
  const encComponentName = encodeURIComponent(componentName);
  const encReplicaName = encodeURIComponent(replicaName);
  const path = `/applications/${encAppName}/deployments/${encDeployName}/components/${encComponentName}/replicas/${encReplicaName}/logs`;

  return usePollingPlain(path, 5000);
};

export default usePollLogs;
