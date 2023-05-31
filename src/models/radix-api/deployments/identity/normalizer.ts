import { IdentityModel } from '.';

import { AzureIdentityModelNormalizer } from '../azure-identity/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create an IdentityModel object
 */
export const IdentityModelNormalizer: ModelNormalizerType<IdentityModel> = (
  props
) => {
  const normalized = { ...(props as IdentityModel) };

  normalized.azure =
    normalized.azure && AzureIdentityModelNormalizer(normalized.azure);

  return Object.freeze(filterUndefinedFields(normalized));
};
