import { EnvironmentModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { arrayNormalizer, filterUndefinedFields } from '../model-utils';
import { DeploymentModelNormalizer } from '../radix-api/deployments/deployment/normalizer';
import { DeploymentSummaryModelNormalizer } from '../radix-api/deployments/deployment-summary/normalizer';
import { SecretModelNormalizer } from '../radix-api/secrets/secret/normalizer';

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
  normalized.deployments = arrayNormalizer(
    normalized.deployments,
    DeploymentSummaryModelNormalizer
  );
  normalized.secrets = arrayNormalizer(
    normalized.secrets,
    SecretModelNormalizer
  );

  return Object.freeze(filterUndefinedFields(normalized));
};
