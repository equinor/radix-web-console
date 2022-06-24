import { useGetPlain } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';

export function useGetOAuthFullLogs(
  appName: string,
  envName: string,
  componentName: string,
  replicaName: string
): AsyncRequestResult<string, void> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);
  const encReplicaName = encodeURIComponent(replicaName);

  return useGetPlain(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/aux/oauth/replicas/${encReplicaName}/logs?file=true`
  );
}
