import { ImageModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an ImageModel object
 */
export const ImageModelNormalizer: ModelNormalizerType<Readonly<ImageModel>> = (
  props
) => Object.freeze(objectNormalizer(props, {}));
