import { ApplicationModel } from '.';

import { ApplicationRegistrationModelNormaliser } from '../application-registration/normaliser';
import { EnvironmentSummaryModelNormaliser } from '../environment-summary/normaliser';
import { JobSummaryNormaliser } from '../job-summary/normaliser';

/**
 * Create an Application object
 */
export const ApplicationModelNormaliser = (
  props: ApplicationModel | unknown
): Readonly<ApplicationModel> => {
  const normalised = { ...(props as ApplicationModel) };

  normalised.environments = normalised.environments.map(
    EnvironmentSummaryModelNormaliser
  );
  normalised.jobs = normalised.jobs.map(JobSummaryNormaliser);
  normalised.registration = ApplicationRegistrationModelNormaliser(
    normalised.registration
  );

  return Object.freeze(normalised);
};
