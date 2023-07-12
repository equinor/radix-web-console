import { AzureKeyVaultSecretVersionModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { dateNormalizer, objectNormalizer } from '../../../model-utils';

/**
 * Create an AzureKeyVaultSecretVersionModel object
 */
export const AzureKeyVaultSecretVersionModelNormalizer: ModelNormalizerType<
  Readonly<AzureKeyVaultSecretVersionModel>
> = (props) =>
  Object.freeze(
    objectNormalizer<AzureKeyVaultSecretVersionModel>(props, {
      replicaCreated: dateNormalizer,
      jobCreated: dateNormalizer,
      batchCreated: dateNormalizer,
    })
  );
