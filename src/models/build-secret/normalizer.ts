import { BuildSecretModel } from '.';

import { ModelNormalizerType } from '../model-types';

/**
 * Create a BuildSecretModel object
 */
export const BuildSecretModelNormalizer: ModelNormalizerType<
  BuildSecretModel
> = (props) => Object.freeze({ ...(props as BuildSecretModel) });
