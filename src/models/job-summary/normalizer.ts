import { JobSummaryModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { arrayNormalizer, dateNormalizer } from '../model-utils';
import { ScanModelNormalizer } from '../scan/normalizer';

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
  normalized.stepSummaryScans = arrayNormalizer(
    normalized.stepSummaryScans,
    ScanModelNormalizer
  );

  return Object.freeze(normalized);
};
