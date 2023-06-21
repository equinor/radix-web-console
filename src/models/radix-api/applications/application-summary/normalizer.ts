import { ApplicationSummaryModel } from '.';

import { ComponentModel } from '../../deployments/component';
import { ComponentModelNormalizer } from '../../deployments/component/normalizer';
import { JobSummaryModelNormalizer } from '../../jobs/job-summary/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields, recordNormalizer } from '../../../model-utils';

/**
 * Create an ApplicationSummaryModel object
 */
export const ApplicationSummaryModelNormalizer: ModelNormalizerType<
  ApplicationSummaryModel
> = (props) => {
  const normalized = { ...(props as ApplicationSummaryModel) };

  normalized.latestJob =
    normalized.latestJob && JobSummaryModelNormalizer(normalized.latestJob);
  normalized.environmentActiveComponents = recordNormalizer(
    normalized.environmentActiveComponents,
    (x: Array<ComponentModel>) => x.map(ComponentModelNormalizer)
  ) as Record<string, Array<ComponentModel>>;

  return Object.freeze(filterUndefinedFields(normalized));
};