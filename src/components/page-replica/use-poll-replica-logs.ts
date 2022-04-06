import { usePollingPlain } from '../../effects';

export const usePollReplicaLogs = (
  appName: string,
  envName: string,
  componentName: string,
  replicaName: string
) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);
  const encReplicaName = encodeURIComponent(replicaName);

  return usePollingPlain<string>(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/replicas/${encReplicaName}/logs`,
    5000
  );
};
