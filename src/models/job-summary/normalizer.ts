import { JobSummaryModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { dateNormalizer, filterUndefinedFields } from '../model-utils';

/**
 * Create a JobSummaryModel object
 */
export const JobSummaryModelNormalizer: ModelNormalizerType<JobSummaryModel> = (
  props
) => {
  const normalized = { ...(props as JobSummaryModel) };
  normalized.created = dateNormalizer(normalized.created);
  normalized.started = dateNormalizer(normalized.started);
  normalized.ended = dateNormalizer(normalized.ended);

  return Object.freeze(filterUndefinedFields(normalized));
};
