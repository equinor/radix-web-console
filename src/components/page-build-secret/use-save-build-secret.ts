import { usePutJson } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';

export function useSaveBuildSecrets(
  appName: string,
  secretName: string
): AsyncRequestResult<string, string> {
  const encAppName = encodeURIComponent(appName);
  const encSecretName = encodeURIComponent(secretName);

  return usePutJson(
    `/applications/${encAppName}/buildsecrets/${encSecretName}`,
    (secret) => ({ secretValue: secret ? secret.toString() : null })
  );
}
