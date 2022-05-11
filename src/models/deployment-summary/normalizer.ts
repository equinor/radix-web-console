import { DeploymentSummaryModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { DateNormalizer } from '../model-utils';

/**
 * Create a DeploymentSummaryModel object
 */
export const DeploymentSummaryModelNormalizer: ModelNormalizerType<
  DeploymentSummaryModel
> = (props) => {
  const normalized = { ...(props as DeploymentSummaryModel) };

  normalized.activeFrom = DateNormalizer(normalized.activeFrom);
  normalized.activeTo = DateNormalizer(normalized.activeTo);

  return Object.freeze(normalized);
};
