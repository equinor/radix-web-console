import { EnvironmentModel } from '.';

import { DeploymentModelNormalizer } from '../../deployments/deployment/normalizer';
import { DeploymentSummaryModelNormalizer } from '../../deployments/deployment-summary/normalizer';
import { SecretModelNormalizer } from '../../secrets/secret/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { arrayNormalizer, filterUndefinedFields } from '../../../model-utils';

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