import { EnvironmentSummaryModel } from '.';

import { DeploymentSummaryModelNormaliser } from '../deployment-summary/normaliser';

/**
 * Create an EnvironmentSummaryModel object
 */
export const EnvironmentSummaryModelNormaliser = (
  props: EnvironmentSummaryModel | unknown
): Readonly<EnvironmentSummaryModel> => {
  const normalised = { ...(props as EnvironmentSummaryModel) };
  normalised.activeDeployment = normalised.activeDeployment
    ? DeploymentSummaryModelNormaliser(normalised.activeDeployment)
    : null;

  return Object.freeze(normalised);
};
