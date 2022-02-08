import { usePollingPlain } from '../../effects';

export const usePollAuxiliaryLogs = (
  appName,
  envName,
  componentName,
  auxType,
  replicaName
) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);
  const encReplicaName = encodeURIComponent(replicaName);
  const path = `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/aux/${auxType}/replicas/${encReplicaName}/logs`;

  return usePollingPlain(path, 5000);
};
