import { AzureKeyVaultSecretStatusModel } from '.';
import { ModelNormalizerType } from '../model-types';
import { dateNormalizer } from '../model-utils';

/**
 * Create a AzureKeyVaultSecretStatusModel object
 */
export const AzureKeyVaultSecretStatusModelNormalizer: ModelNormalizerType<
  AzureKeyVaultSecretStatusModel
> = (props) => {
  const normalized = { ...(props as AzureKeyVaultSecretStatusModel) };
  normalized.replicaCreated = dateNormalizer(normalized.replicaCreated);
  normalized.jobCreated = dateNormalizer(normalized.jobCreated);
  normalized.batchCreated = dateNormalizer(normalized.batchCreated);
  return Object.freeze(normalized);
};
