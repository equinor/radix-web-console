import { BuildSecretModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';

/**
 * Create a BuildSecretModel object
 */
export const BuildSecretModelNormalizer: ModelNormalizerType<
  BuildSecretModel
> = (props) =>
  Object.freeze(filterUndefinedFields({ ...(props as BuildSecretModel) }));
