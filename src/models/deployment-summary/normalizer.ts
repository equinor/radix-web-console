import { DeploymentSummaryModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { dateNormalizer, filterUndefinedFields } from '../model-utils';

/**
 * Create a DeploymentSummaryModel object
 */
export const DeploymentSummaryModelNormalizer: ModelNormalizerType<
  DeploymentSummaryModel
> = (props) => {
  const normalized = { ...(props as DeploymentSummaryModel) };

  normalized.activeFrom = dateNormalizer(normalized.activeFrom);
  normalized.activeTo = dateNormalizer(normalized.activeTo);

  return Object.freeze(filterUndefinedFields(normalized));
};
