import { ApplicationSummaryModel } from '.';

import { DeploymentModelNormalizer } from '../deployment/normalizer';
import { JobSummaryModelNormalizer } from '../job-summary/normalizer';
import { ModelNormalizerType } from '../model-types';
import { arrayNormalizer, filterUndefinedFields } from '../model-utils';

/**
 * Create an ApplicationSummaryModel object
 */
export const ApplicationSummaryModelNormalizer: ModelNormalizerType<
  ApplicationSummaryModel
> = (props) => {
  const normalized = { ...(props as ApplicationSummaryModel) };

  normalized.latestJob =
    normalized.latestJob && JobSummaryModelNormalizer(normalized.latestJob);
  normalized.activeDeployments = arrayNormalizer(
    normalized.activeDeployments,
    DeploymentModelNormalizer
  );

  return Object.freeze(filterUndefinedFields(normalized));
};
