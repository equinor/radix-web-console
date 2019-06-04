import pick from 'lodash/pick';

import model from '.';

/**
 * Create a Replica object
 */
export default props => {
  const replica = pick(props, Object.keys(model));

  replica.status = props.replicaStatus.status;
  return Object.freeze(replica);
};
