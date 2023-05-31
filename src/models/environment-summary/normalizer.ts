import { EnvironmentSummaryModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';
import { DeploymentSummaryModelNormalizer } from '../radix-api/deployments/deployment-summary/normalizer';

/**
 * Create an EnvironmentSummaryModel object
 */
export const EnvironmentSummaryModelNormalizer: ModelNormalizerType<
  EnvironmentSummaryModel
> = (props) => {
  const normalized = { ...(props as EnvironmentSummaryModel) };

  normalized.activeDeployment =
    normalized.activeDeployment &&
    DeploymentSummaryModelNormalizer(normalized.activeDeployment);

  return Object.freeze(filterUndefinedFields(normalized));
};
