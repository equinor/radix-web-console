import { ImageHubSecretModel } from '.';

import { ModelNormalizerType } from '../model-types';

/**
 * Create an ImageHubSecretModel object
 */
export const ImageHubSecretModelNormalizer: ModelNormalizerType<
  ImageHubSecretModel
> = (props) => Object.freeze({ ...(props as ImageHubSecretModel) });
