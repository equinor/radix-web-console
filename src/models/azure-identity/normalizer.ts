import { AzureIdentityModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';

/**
 * Create an AzureIdentityModel object
 */
export const AzureIdentityModelNormalizer: ModelNormalizerType<
  AzureIdentityModel
> = (props) =>
  Object.freeze(filterUndefinedFields({ ...(props as AzureIdentityModel) }));
