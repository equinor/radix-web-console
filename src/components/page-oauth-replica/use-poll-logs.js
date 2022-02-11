import { usePollingPlain } from '../../effects';

export const usePollLogs = (appName, envName, componentName, replicaName) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);
  const encReplicaName = encodeURIComponent(replicaName);
  const path = `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/aux/oauth/replicas/${encReplicaName}/logs`;

  return usePollingPlain(path, 5000);
};
