import { EnvironmentModel } from '.';

import { DeploymentSummaryModelNormalizer } from '../../deployments/deployment-summary/normalizer';
import { DeploymentModelNormalizer } from '../../deployments/deployment/normalizer';
import { SecretModelNormalizer } from '../../secrets/secret/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { arrayNormalizer, objectNormalizer } from '../../../model-utils';

/**
 * Create an EnvironmentModel object
 */
export const EnvironmentModelNormalizer: ModelNormalizerType<
  Readonly<EnvironmentModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      activeDeployment: DeploymentModelNormalizer,
      deployments: (x: []) =>
        arrayNormalizer(x, DeploymentSummaryModelNormalizer),
      secrets: (x: []) => arrayNormalizer(x, SecretModelNormalizer),
    })
  );
