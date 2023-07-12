import { BuildSecretModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create a BuildSecretModel object
 */
export const BuildSecretModelNormalizer: ModelNormalizerType<
  Readonly<BuildSecretModel>
> = (props) => Object.freeze(objectNormalizer<BuildSecretModel>(props, {}));
