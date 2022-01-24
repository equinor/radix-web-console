import { DeploymentSummaryModel } from '.';

/**
 * Create a DeploymentSummaryModel object
 */
export const DeploymentSummaryModelNormaliser = (
  props: DeploymentSummaryModel | any
): Readonly<DeploymentSummaryModel> => {
  const normalised = { ...(props as DeploymentSummaryModel) };

  normalised.activeFrom = normalised.activeFrom
    ? new Date(normalised.activeFrom)
    : null;
  normalised.activeTo = normalised.activeTo
    ? new Date(normalised.activeTo)
    : null;

  return Object.freeze(normalised);
};
