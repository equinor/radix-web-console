import { JobSummaryModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { ScanModelNormalizer } from '../scan/normalizer';

/**
 * Create a JobSummaryModel object
 */
export const JobSummaryModelNormalizer: ModelNormalizerType<JobSummaryModel> = (
  props
) => {
  const normalized = { ...(props as JobSummaryModel) };

  const created = new Date(normalized.created);
  const ended = new Date(normalized.ended);
  const started = new Date(normalized.started);

  normalized.started = isNaN(started?.valueOf()) ? undefined : started;
  normalized.ended = isNaN(ended?.valueOf()) ? undefined : ended;
  normalized.created = isNaN(created?.valueOf()) ? undefined : created;
  normalized.stepSummaryScans =
    normalized.stepSummaryScans?.map(ScanModelNormalizer);

  return Object.freeze(normalized);
};
