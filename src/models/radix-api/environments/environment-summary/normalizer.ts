import { EnvironmentSummaryModel } from '.';

import { DeploymentSummaryModelNormalizer } from '../../deployments/deployment-summary/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an EnvironmentSummaryModel object
 */
export const EnvironmentSummaryModelNormalizer: ModelNormalizerType<
  Readonly<EnvironmentSummaryModel>
> = (props) =>
  Object.freeze(
    objectNormalizer<EnvironmentSummaryModel>(props, {
      activeDeployment: DeploymentSummaryModelNormalizer,
    })
  );
