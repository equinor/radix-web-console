import { SecretModel } from '.';

import { ModelNormalizerType } from '../model-types';

/**
 * Create a SecretModel object
 */
export const SecretModelNormalizer: ModelNormalizerType<SecretModel> = (
  props
) => Object.freeze({ ...(props as SecretModel) });
