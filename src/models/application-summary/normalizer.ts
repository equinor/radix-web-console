import { ApplicationSummaryModel } from '.';

import { JobSummaryModelNormalizer } from '../job-summary/normalizer';
import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields, recordNormalizer } from '../model-utils';
import { ComponentModel } from '../radix-api/deployments/component';
import { ComponentModelNormalizer } from '../radix-api/deployments/component/normalizer';

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
