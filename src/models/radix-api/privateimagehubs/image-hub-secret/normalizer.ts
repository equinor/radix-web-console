import { ImageHubSecretModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create an ImageHubSecretModel object
 */
export const ImageHubSecretModelNormalizer: ModelNormalizerType<
  ImageHubSecretModel
> = (props) =>
  Object.freeze(filterUndefinedFields({ ...(props as ImageHubSecretModel) }));
