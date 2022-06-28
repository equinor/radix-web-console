import { ApplicationModel } from '.';

import { ApplicationRegistrationModelNormalizer } from '../application-registration/normalizer';
import { EnvironmentSummaryModelNormalizer } from '../environment-summary/normalizer';
import { JobSummaryModelNormalizer } from '../job-summary/normalizer';
import { ModelNormalizerType } from '../model-types';
import { arrayNormalizer } from '../model-utils';

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

  return Object.freeze(normalized);
};
