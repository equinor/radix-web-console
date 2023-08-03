import { JobSummaryModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { dateNormalizer, objectNormalizer } from '../../../model-utils';

/**
 * Create a JobSummaryModel object
 */
export const JobSummaryModelNormalizer: ModelNormalizerType<
  Readonly<JobSummaryModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      created: dateNormalizer,
      ended: dateNormalizer,
      started: dateNormalizer,
    })
  );
