import { usePollingJson } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';
import { DeployKeyAndSecretModel } from '../../models/deploy-key-and-secret';
import { DeployKeyAndSecretModelNormalizer } from '../../models/deploy-key-and-secret/normalizer';

export function usePollDeployKeyAndSecret(
  appName: string,
  interval: number = 0
): AsyncPollingResult<Readonly<DeployKeyAndSecretModel>> {
  const encAppName = encodeURIComponent(appName);

  return usePollingJson(
    `/applications/${encAppName}/deploy-key-and-secret`,
    interval,
    DeployKeyAndSecretModelNormalizer
  );
}
