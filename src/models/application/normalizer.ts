import { ApplicationModel } from '.';

import { ApplicationRegistrationModelNormalizer } from '../application-registration/normalizer';
import { ModelNormalizerType } from '../model-types';
import { arrayNormalizer, filterUndefinedFields } from '../model-utils';
import { EnvironmentSummaryModelNormalizer } from '../radix-api/environments/environment-summary/normalizer';
import { JobSummaryModelNormalizer } from '../radix-api/jobs/job-summary/normalizer';

/**
 * Create an ApplicationModel object
 */
export const ApplicationModelNormalizer: ModelNormalizerType<
  ApplicationModel
> = (props) => {
  const normalized = { ...(props as ApplicationModel) };

  normalized.environments = arrayNormalizer(
    normalized.environments,
    EnvironmentSummaryModelNormalizer
  );
  normalized.jobs = arrayNormalizer(normalized.jobs, JobSummaryModelNormalizer);
  normalized.registration =
    normalized.registration &&
    ApplicationRegistrationModelNormalizer(normalized.registration);

  return Object.freeze(filterUndefinedFields(normalized));
};
