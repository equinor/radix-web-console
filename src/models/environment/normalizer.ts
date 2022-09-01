import { EnvironmentModel } from '.';

import { DeploymentSummaryModelNormalizer } from '../deployment-summary/normalizer';
import { DeploymentModelNormalizer } from '../deployment/normalizer';
import { ModelNormalizerType } from '../model-types';
import { arrayNormalizer, filterUndefinedFields } from '../model-utils';
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
