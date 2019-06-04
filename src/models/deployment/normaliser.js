import pick from 'lodash/pick';

import componentNormaliser from '../component/normaliser';

import model from '.';

/**
 * Create a Deployment object
 */
export default props => {
  const deployment = pick(props, Object.keys(model));

  deployment.activeFrom = deployment.activeFrom
    ? new Date(deployment.activeFrom)
    : null;
  deployment.activeTo = deployment.activeTo
    ? new Date(deployment.activeTo)
    : null;
  deployment.components = deployment.components
    ? deployment.components.map(componentNormaliser)
    : null;

  return Object.freeze(deployment);
};
