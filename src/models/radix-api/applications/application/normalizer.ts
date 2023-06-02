import { ApplicationModel } from '.';

import { ApplicationAliasModelNormalizer } from '../application-alias/normalizer';
import { ApplicationRegistrationModelNormalizer } from '../application-registration/normalizer';
import { EnvironmentSummaryModelNormalizer } from '../../environments/environment-summary/normalizer';
import { JobSummaryModelNormalizer } from '../../jobs/job-summary/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { arrayNormalizer, filterUndefinedFields } from '../../../model-utils';

/**
 * Create an ApplicationModel object
 */
export const ApplicationModelNormalizer: ModelNormalizerType<
  ApplicationModel
> = (props) => {
  const normalized = { ...(props as ApplicationModel) };

  normalized.registration =
    normalized.registration &&
    ApplicationRegistrationModelNormalizer(normalized.registration);
  normalized.environments = arrayNormalizer(
    normalized.environments,
    EnvironmentSummaryModelNormalizer
  );
  normalized.jobs = arrayNormalizer(normalized.jobs, JobSummaryModelNormalizer);
  normalized.appAlias =
    normalized.appAlias && ApplicationAliasModelNormalizer(normalized.appAlias);

  return Object.freeze(filterUndefinedFields(normalized));
};
