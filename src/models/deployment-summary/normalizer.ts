import { DeploymentSummaryModel } from '.';

import { ModelNormalizerType } from '../model-types';

/**
 * Create a DeploymentSummaryModel object
 */
export const DeploymentSummaryModelNormalizer: ModelNormalizerType<
  DeploymentSummaryModel
> = (props) => {
  const normalized = { ...(props as DeploymentSummaryModel) };

  const activeFrom = new Date(normalized.activeFrom);
  const activeTo = new Date(normalized.activeTo);

  normalized.activeFrom = isNaN(activeFrom?.valueOf()) ? undefined : activeFrom;
  normalized.activeTo = isNaN(activeTo?.valueOf()) ? undefined : activeTo;

  return Object.freeze(normalized);
};
