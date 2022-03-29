import { DeploymentModel } from '.';

import { ComponentModelNormalizer } from '../component/normalizer';
import { ModelNormalizerType } from '../model-types';

/**
 * Create a DeploymentModel object
 */
export const DeploymentModelNormalizer: ModelNormalizerType<DeploymentModel> = (
  props
) => {
  const normalized = { ...(props as DeploymentModel) };

  const activeFrom = new Date(normalized.activeFrom);
  const activeTo = new Date(normalized.activeTo);

  normalized.activeFrom = isNaN(activeFrom?.valueOf()) ? undefined : activeFrom;
  normalized.activeTo = isNaN(activeTo?.valueOf()) ? undefined : activeTo;
  normalized.components = normalized.components?.map(ComponentModelNormalizer);

  return Object.freeze(normalized);
};
