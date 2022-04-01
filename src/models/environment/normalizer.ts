import { EnvironmentModel } from '.';

import { DeploymentModelNormalizer } from '../deployment/normalizer';
import { DeploymentSummaryModelNormalizer } from '../deployment-summary/normalizer';
import { ModelNormalizerType } from '../model-types';
import { SecretModelNormalizer } from '../secret/normalizer';

/**
 * Create an EnvironmentModel object
 */
export const EnvironmentModelNormalizer: ModelNormalizerType<
  EnvironmentModel
> = (props) => {
  const normalized = { ...(props as EnvironmentModel) };

  normalized.activeDeployment =
    normalized.activeDeployment &&
    DeploymentModelNormalizer(normalized.activeDeployment);
  normalized.deployments = normalized.deployments?.map(
    DeploymentSummaryModelNormalizer
  );
  normalized.secrets = normalized.secrets?.map(SecretModelNormalizer);

  return Object.freeze(normalized);
};
