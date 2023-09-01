import { useGetLogPlain } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';

export function useGetReplicaContainerLog(
  appName: string,
  envName: string,
  componentName: string,
  replicaName: string,
  containerId: string
): AsyncRequestResult<string, void> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);
  const encReplicaName = encodeURIComponent(replicaName);
  const encContainerId = encodeURIComponent(containerId);

  return useGetLogPlain(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/replicas/${encReplicaName}/containers/${encContainerId}/log`
  );
}
