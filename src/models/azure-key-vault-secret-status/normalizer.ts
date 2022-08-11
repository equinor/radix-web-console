import { AzureKeyVaultSecretStatusModel } from '.';
import { ModelNormalizerType } from '../model-types';

/**
 * Create a AzureKeyVaultSecretStatusModel object
 */
export const AzureKeyVaultSecretStatusModelNormalizer: ModelNormalizerType<
  AzureKeyVaultSecretStatusModel
> = (props) => Object.freeze({ ...(props as AzureKeyVaultSecretStatusModel) });
