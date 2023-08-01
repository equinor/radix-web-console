import { DeployKeyAndSecretModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create a DeployKeyAndSecretModel object
 */
export const DeployKeyAndSecretModelNormalizer: ModelNormalizerType<
  Readonly<DeployKeyAndSecretModel>
> = (props) => Object.freeze(objectNormalizer(props, {}));
