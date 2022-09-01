import { ScheduledBatchSummaryModel } from '.';

import { ModelNormalizerType } from '../model-types';
import {
  arrayNormalizer,
  dateNormalizer,
  filterUndefinedFields,
} from '../model-utils';
import { ReplicaSummaryModelNormalizer } from '../replica-summary/normalizer';
import { ScheduledJobSummaryModelNormalizer } from '../scheduled-job-summary/normalizer';

/**
 * Create a ScheduledBatchSummaryModel object
 */
export const ScheduledBatchSummaryModelNormalizer: ModelNormalizerType<
  ScheduledBatchSummaryModel
> = (props) => {
  const normalized = { ...(props as ScheduledBatchSummaryModel) };

  normalized.created = dateNormalizer(normalized.created);
  normalized.started = dateNormalizer(normalized.started);
  normalized.ended = dateNormalizer(normalized.ended);
  normalized.replica =
    normalized.replica && ReplicaSummaryModelNormalizer(normalized.replica);
  normalized.jobList = arrayNormalizer(
    normalized.jobList,
    ScheduledJobSummaryModelNormalizer
  );

  return Object.freeze(filterUndefinedFields(normalized));
};
