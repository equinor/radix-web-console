import { usePollingJson } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';

export function usePollDeployKeyAndSecret(
  appName: string
): AsyncPollingResult<Readonly<any>> {
  const encAppName = encodeURIComponent(appName);

  return usePollingJson(`/applications/${encAppName}/deploy-key-and-secret`, 0);
}
