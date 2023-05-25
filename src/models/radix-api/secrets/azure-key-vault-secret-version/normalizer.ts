import { AzureKeyVaultSecretVersionModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { dateNormalizer, filterUndefinedFields } from '../../../model-utils';

/**
 * Create a AzureKeyVaultSecretVersionModel object
 */
export const AzureKeyVaultSecretVersionModelNormalizer: ModelNormalizerType<
  AzureKeyVaultSecretVersionModel
> = (props) => {
  const normalized = { ...(props as AzureKeyVaultSecretVersionModel) };

  normalized.replicaCreated = dateNormalizer(normalized.replicaCreated);
  normalized.jobCreated = dateNormalizer(normalized.jobCreated);
  normalized.batchCreated = dateNormalizer(normalized.batchCreated);

  return Object.freeze(filterUndefinedFields(normalized));
};
