import { useCallback } from 'react';

import { usePollingJson } from '../../../effects';
import { AsyncPollingResult } from '../../../effects/use-async-polling';
import { AzureKeyVaultSecretStatusModel } from '../../../models/azure-key-vault-secret-status';
import { arrayNormalizer } from '../../../models/model-utils';
import { AzureKeyVaultSecretStatusModelNormalizer } from '../../../models/azure-key-vault-secret-status/normalizer';

export function usePollAzureKeyVaultSecretState(
  appName: string,
  envName: string,
  componentName: string,
  storageName: string,
  secretName: string,
  isPollingPaused: boolean
): AsyncPollingResult<Array<Readonly<AzureKeyVaultSecretStatusModel>>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);
  const encStorageName = encodeURIComponent(storageName);
  const encSecretName = encodeURIComponent(secretName);

  return usePollingJson(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/secrets/azure/keyvault/${encStorageName}?secretName=${encSecretName}`,
    isPollingPaused ? 0 : 8000,
    useCallback(
      (x: []) => arrayNormalizer(x, AzureKeyVaultSecretStatusModelNormalizer),
      []
    )
  );
}
