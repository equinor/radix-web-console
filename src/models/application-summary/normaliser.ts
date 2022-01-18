import { ApplicationSummaryModel } from '.';

import { JobSummaryNormaliser } from '../job-summary/normaliser';

/**
 * Create an ApplicationSummary object
 */
export const ApplicationSummaryNormaliser = (
  props: ApplicationSummaryModel | unknown
): Readonly<ApplicationSummaryModel> => {
  const normalised = { ...(props as ApplicationSummaryModel) };
  normalised.latestJob = normalised.latestJob
    ? JobSummaryNormaliser(normalised.latestJob)
    : null;

  return Object.freeze(normalised);
};
