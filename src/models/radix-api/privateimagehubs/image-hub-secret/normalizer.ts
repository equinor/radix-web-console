import { ImageHubSecretModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an ImageHubSecretModel object
 */
export const ImageHubSecretModelNormalizer: ModelNormalizerType<
  Readonly<ImageHubSecretModel>
> = (props) => Object.freeze(objectNormalizer(props, {}));
