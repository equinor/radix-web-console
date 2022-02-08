import pick from 'lodash/pick';

import deploymentNormaliser from '../deployment/normaliser';
import { DeploymentSummaryModelNormalizer } from '../deployment-summary/normalizer';
import secretNormaliser from '../secret/normaliser';

import model from '.';

/**
 * Create an Environment object
 */
export const normaliser = (props) => {
  const env = pick(props, Object.keys(model));

  env.activeDeployment = env.activeDeployment
    ? deploymentNormaliser(env.activeDeployment)
    : null;
  env.deployments = env.deployments
    ? env.deployments.map(DeploymentSummaryModelNormalizer)
    : [];
  env.secrets = env.secrets ? env.secrets.map(secretNormaliser) : [];

  return Object.freeze(env);
};

export default normaliser;
