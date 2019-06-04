import pick from 'lodash/pick';

import portNormaliser from '../port/normaliser';
import replicaNormaliser from '../replica/normaliser';

import model from '.';

/**
 * Create a Component object
 */
export default props => {
  const component = pick(props, Object.keys(model));

  component.ports = component.ports
    ? component.ports.map(portNormaliser)
    : null;

  component.replicaList = component.replicaList
    ? component.replicaList.map(replicaNormaliser)
    : null;

  return Object.freeze(component);
};
