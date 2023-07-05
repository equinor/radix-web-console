import { usePutJson } from '../../effects';

export function useSaveBuildSecrets(appName, secretName) {
  const encAppName = encodeURIComponent(appName);
  const encSecretName = encodeURIComponent(secretName);

  return usePutJson(
    `/applications/${encAppName}/buildsecrets/${encSecretName}`,
    (secret) => ({ secretValue: secret ? secret.toString() : null })
  );
}
