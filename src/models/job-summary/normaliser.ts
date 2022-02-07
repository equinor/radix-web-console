import { JobSummaryModel } from '.';

import { ModelNormaliserType } from '../model-types';
import { ScanModelNormaliser } from '../scan/normaliser';

/**
 * Create a JobSummary object
 */
export const JobSummaryModelNormaliser: ModelNormaliserType<JobSummaryModel> = (
  props
) => {
  const normalised = { ...(props as JobSummaryModel) };

  normalised.started = normalised.started && new Date(normalised.started);
  normalised.ended = normalised.ended && new Date(normalised.ended);
  normalised.created = normalised.created && new Date(normalised.created);
  normalised.stepSummaryScans =
    normalised.stepSummaryScans?.map(ScanModelNormaliser);

  return Object.freeze(normalised);
};
