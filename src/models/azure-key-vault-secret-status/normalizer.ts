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
  normalized.replicaCreatedTimestamp = dateNormalizer(
    normalized.replicaCreatedTimestamp
  );
  return Object.freeze(normalized);
};
