import { ApplicationSummaryModel } from '.';

import { JobSummaryModelNormalizer } from '../job-summary/normalizer';
import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';

/**
 * Create an ApplicationSummaryModel object
 */
export const ApplicationSummaryModelNormalizer: ModelNormalizerType<
  ApplicationSummaryModel
> = (props) => {
  const normalized = { ...(props as ApplicationSummaryModel) };

  normalized.latestJob =
    normalized.latestJob && JobSummaryModelNormalizer(normalized.latestJob);

  return Object.freeze(filterUndefinedFields(normalized));
};
