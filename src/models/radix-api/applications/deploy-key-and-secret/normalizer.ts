import { DeployKeyAndSecretModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create a DeployKeyAndSecretModel object
 */
export const DeployKeyAndSecretModelNormalizer: ModelNormalizerType<
  DeployKeyAndSecretModel
> = (props) =>
  Object.freeze(
    filterUndefinedFields({ ...(props as DeployKeyAndSecretModel) })
  );
