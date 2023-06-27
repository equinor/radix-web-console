import { ImageModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create an ImageModel object
 */
export const ImageModelNormalizer: ModelNormalizerType<ImageModel> = (props) =>
  Object.freeze(filterUndefinedFields({ ...(props as ImageModel) }));
