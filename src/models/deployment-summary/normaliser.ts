import { DeploymentSummaryModel } from '.';

import { ModelNormaliserType } from '../model-types';

/**
 * Create a DeploymentSummaryModel object
 */
export const DeploymentSummaryModelNormaliser: ModelNormaliserType<DeploymentSummaryModel> =
  (props) => {
    const normalised = { ...(props as DeploymentSummaryModel) };

    normalised.activeFrom =
      normalised.activeFrom && new Date(normalised.activeFrom);
    normalised.activeTo = normalised.activeTo && new Date(normalised.activeTo);

    return Object.freeze(normalised);
  };
