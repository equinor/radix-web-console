import { useCallback } from 'react';

import { usePollingJson } from '../../../effects';
import { AsyncPollingResult } from '../../../effects/use-async-polling';
import { arrayNormalizer } from '../../../models/model-utils';
import { AzureKeyVaultSecretVersionModel } from '../../../models/radix-api/secrets/azure-key-vault-secret-version';
import { AzureKeyVaultSecretVersionModelNormalizer } from '../../../models/radix-api/secrets/azure-key-vault-secret-version/normalizer';

export function usePollAzureKeyVaultSecretState(
  appName: string,
  envName: string,
  componentName: string,
  azureKeyVaultName: string,
  secretName: string,
  isPollingPaused: boolean
): AsyncPollingResult<Array<Readonly<AzureKeyVaultSecretVersionModel>>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);
  const encAzureKeyVaultName = encodeURIComponent(azureKeyVaultName);
  const encSecretName = encodeURIComponent(secretName);

  return usePollingJson(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/secrets/azure/keyvault/${encAzureKeyVaultName}?secretName=${encSecretName}`,
    isPollingPaused ? 0 : 8000,
    useCallback(
      (x) => arrayNormalizer(x, AzureKeyVaultSecretVersionModelNormalizer),
      []
    )
  );
}
