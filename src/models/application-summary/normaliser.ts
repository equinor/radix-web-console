import { ApplicationSummaryModel } from '.';

import { JobSummaryModelNormaliser } from '../job-summary/normaliser';
import { ModelNormaliserType } from '../model-types';

/**
 * Create an ApplicationSummaryModel object
 */
export const ApplicationSummaryModelNormaliser: ModelNormaliserType<
  ApplicationSummaryModel
> = (props) => {
  const normalised = { ...(props as ApplicationSummaryModel) };
  normalised.latestJob =
    normalised.latestJob && JobSummaryModelNormaliser(normalised.latestJob);

  return Object.freeze(normalised);
};
