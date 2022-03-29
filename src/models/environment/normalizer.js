import { pick } from 'lodash';

import model from '.';

import { DeploymentModelNormalizer } from '../deployment/normalizer';
import { DeploymentSummaryModelNormalizer } from '../deployment-summary/normalizer';
import { SecretModelNormalizer } from '../secret/normalizer';

/**
 * Create an EnvironmentModel object
 */
export const normalizer = (props) => {
  const normalized = pick(props, Object.keys(model));

  normalized.activeDeployment =
    normalized.activeDeployment &&
    DeploymentModelNormalizer(normalized.activeDeployment);
  normalized.deployments =
    normalized.deployments?.map(DeploymentSummaryModelNormalizer) || [];
  normalized.secrets = normalized.secrets?.map(SecretModelNormalizer) || [];

  return Object.freeze(normalized);
};

export default normalizer;
