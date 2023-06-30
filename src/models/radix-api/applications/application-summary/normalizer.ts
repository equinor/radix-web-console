import { ApplicationSummaryModel } from '.';

import { ComponentModelNormalizer } from '../../deployments/component/normalizer';
import { JobSummaryModelNormalizer } from '../../jobs/job-summary/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  arrayNormalizer,
  objectNormalizer,
  recordNormalizer,
} from '../../../model-utils';

/**
 * Create an ApplicationSummaryModel object
 */
export const ApplicationSummaryModelNormalizer: ModelNormalizerType<
  Readonly<ApplicationSummaryModel>
> = (props) =>
  Object.freeze(
    objectNormalizer<ApplicationSummaryModel>(props, {
      latestJob: JobSummaryModelNormalizer,
      environmentActiveComponents: (x: {}) =>
        recordNormalizer(x, (y: []) =>
          arrayNormalizer(y, ComponentModelNormalizer)
        ),
    })
  );
