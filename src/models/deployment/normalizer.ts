import { DeploymentModel } from '.';

import { ComponentModelNormalizer } from '../component/normalizer';
import { ModelNormalizerType } from '../model-types';
import { arrayNormalizer, dateNormalizer } from '../model-utils';

/**
 * Create a DeploymentModel object
 */
export const DeploymentModelNormalizer: ModelNormalizerType<DeploymentModel> = (
  props
) => {
  const normalized = { ...(props as DeploymentModel) };

  normalized.activeFrom = dateNormalizer(normalized.activeFrom);
  normalized.activeTo = dateNormalizer(normalized.activeTo);
  normalized.components = arrayNormalizer(
    normalized.components,
    ComponentModelNormalizer
  );

  return Object.freeze(normalized);
};
