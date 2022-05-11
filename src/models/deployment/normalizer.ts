import { DeploymentModel } from '.';

import { ComponentModelNormalizer } from '../component/normalizer';
import { ModelNormalizerType } from '../model-types';
import { DateNormalizer } from '../model-utils';

/**
 * Create a DeploymentModel object
 */
export const DeploymentModelNormalizer: ModelNormalizerType<DeploymentModel> = (
  props
) => {
  const normalized = { ...(props as DeploymentModel) };

  normalized.activeFrom = DateNormalizer(normalized.activeFrom);
  normalized.activeTo = DateNormalizer(normalized.activeTo);
  normalized.components = normalized.components?.map(ComponentModelNormalizer);

  return Object.freeze(normalized);
};
