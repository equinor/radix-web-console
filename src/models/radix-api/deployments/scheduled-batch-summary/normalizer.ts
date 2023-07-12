import { ScheduledBatchSummaryModel } from '.';

import { ReplicaSummaryModelNormalizer } from '../replica-summary/normalizer';
import { ScheduledJobSummaryModelNormalizer } from '../scheduled-job-summary/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  arrayNormalizer,
  dateNormalizer,
  objectNormalizer,
} from '../../../model-utils';

/**
 * Create a ScheduledBatchSummaryModel object
 */
export const ScheduledBatchSummaryModelNormalizer: ModelNormalizerType<
  Readonly<ScheduledBatchSummaryModel>
> = (props) =>
  Object.freeze(
    objectNormalizer<ScheduledBatchSummaryModel>(props, {
      created: dateNormalizer,
      started: dateNormalizer,
      ended: dateNormalizer,
      replica: ReplicaSummaryModelNormalizer,
      jobList: (x: []) =>
        arrayNormalizer(x, ScheduledJobSummaryModelNormalizer),
    })
  );
