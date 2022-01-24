import pick from 'lodash/pick';

import { DeploymentSummaryModelNormaliser } from '../deployment-summary/normaliser';

import model from '.';

/**
 * Create an Environment Summary object
 */
export const normaliser = (props) => {
  const env = pick(props, Object.keys(model));

  env.activeDeployment = env.activeDeployment
    ? DeploymentSummaryModelNormaliser(env.activeDeployment)
    : null;

  return Object.freeze(env);
};

export default normaliser;
