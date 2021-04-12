import { usePollingPlain } from '../../effects';

const usePollLogs = (appName, envName, componentName, replicaName) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);
  const encReplicaName = encodeURIComponent(replicaName);
  const path = `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/replicas/${encReplicaName}/logs`;

  return usePollingPlain(path, 5000);
};

export default usePollLogs;
