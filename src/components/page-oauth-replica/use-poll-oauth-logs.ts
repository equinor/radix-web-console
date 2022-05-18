import { usePollingPlain } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';

export function usePollOAuthLogs(
  appName: string,
  envName: string,
  componentName: string,
  replicaName: string
): AsyncPollingResult<Readonly<string>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);
  const encReplicaName = encodeURIComponent(replicaName);

  return usePollingPlain(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/aux/oauth/replicas/${encReplicaName}/logs`,
    5000
  );
}
