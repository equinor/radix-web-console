import { useGetPlainText } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';

export function useGetReplicaFullLog(
  appName: string,
  envName: string,
  componentName: string,
  replicaName: string
): AsyncRequestResult<string, void> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);
  const encReplicaName = encodeURIComponent(replicaName);

  return useGetPlainText(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/replicas/${encReplicaName}/logs?file=true`
  );
}
