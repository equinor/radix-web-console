import { useGetLogPlain } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';

export function useGetReplicaLog(
  appName: string,
  envName: string,
  componentName: string,
  replicaName: string
): AsyncRequestResult<Readonly<string>, void> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);
  const encReplicaName = encodeURIComponent(replicaName);

  return useGetLogPlain(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/replicas/${encReplicaName}/log`
  );
}
