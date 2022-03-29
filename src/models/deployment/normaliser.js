import pick from 'lodash/pick';

import model from '.';

import { ComponentModelNormalizer } from '../component/normalizer';

/**
 * Create a DeploymentModel object
 */
export const normaliser = (props) => {
  const deployment = pick(props, Object.keys(model));

  deployment.activeFrom = deployment.activeFrom
    ? new Date(deployment.activeFrom)
    : null;
  deployment.activeTo = deployment.activeTo
    ? new Date(deployment.activeTo)
    : null;
  deployment.components = deployment.components?.map(ComponentModelNormalizer);

  return Object.freeze(deployment);
};

export default normaliser;
