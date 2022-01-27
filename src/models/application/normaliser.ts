import { ApplicationModel } from '.';

import { ApplicationRegistrationModelNormaliser } from '../application-registration/normaliser';
import { EnvironmentSummaryModelNormaliser } from '../environment-summary/normaliser';
import { JobSummaryModelNormaliser } from '../job-summary/normaliser';

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
  normalised.jobs = normalised.jobs.map(JobSummaryModelNormaliser);
  normalised.registration = ApplicationRegistrationModelNormaliser(
    normalised.registration
  );

  return Object.freeze(normalised);
};
