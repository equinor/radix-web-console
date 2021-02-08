import pick from 'lodash/pick';

import model from '.';

/**
 * Create a Replica object
 */
export const normaliser = (props) => {
  const replica = pick(props, Object.keys(model));

  replica.status = props.replicaStatus.status;
  return Object.freeze(replica);
};

export default normaliser;
