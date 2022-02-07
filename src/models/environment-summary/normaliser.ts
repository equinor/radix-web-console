import { EnvironmentSummaryModel } from '.';

import { DeploymentSummaryModelNormaliser } from '../deployment-summary/normaliser';
import { ModelNormaliserType } from '../model-types';

/**
 * Create an EnvironmentSummaryModel object
 */
export const EnvironmentSummaryModelNormaliser: ModelNormaliserType<
  EnvironmentSummaryModel
> = (props) => {
  const normalised = { ...(props as EnvironmentSummaryModel) };
  normalised.activeDeployment =
    normalised.activeDeployment &&
    DeploymentSummaryModelNormaliser(normalised.activeDeployment);

  return Object.freeze(normalised);
};
