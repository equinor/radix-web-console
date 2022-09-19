import { SecretModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';

/**
 * Create a SecretModel object
 */
export const SecretModelNormalizer: ModelNormalizerType<SecretModel> = (
  props
) => Object.freeze(filterUndefinedFields({ ...(props as SecretModel) }));
