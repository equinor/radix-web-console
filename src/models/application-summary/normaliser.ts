import { ApplicationSummaryModel } from '.';

import { JobSummaryModelNormaliser } from '../job-summary/normaliser';

/**
 * Create an ApplicationSummary object
 */
export const ApplicationSummaryModelNormaliser = (
  props: ApplicationSummaryModel | unknown
): Readonly<ApplicationSummaryModel> => {
  const normalised = { ...(props as ApplicationSummaryModel) };
  normalised.latestJob = normalised.latestJob
    ? JobSummaryModelNormaliser(normalised.latestJob)
    : null;

  return Object.freeze(normalised);
};
