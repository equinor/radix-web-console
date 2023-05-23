import { DeployKeyAndSecretModel } from './index';

import { ModelNormalizerType } from '../model-types';

import { filterUndefinedFields } from '../model-utils';

/**
 * Create a DeployKeyAndSecretModel object
 */
export const DeployKeyAndSecretModelNormalizer: ModelNormalizerType<
  DeployKeyAndSecretModel
> = (props) => {
  const normalized = { ...(props as DeployKeyAndSecretModel) };

  return Object.freeze(filterUndefinedFields(normalized));
};
