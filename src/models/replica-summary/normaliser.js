import pick from 'lodash/pick';

import model from '.';

/**
 * Create a Replica object
 */
export const normaliser = (props) => {
  if (props == null) {
    return null;
  }
  const replica = pick(props, Object.keys(model));

  replica.status = props.replicaStatus.status;
  replica.created = replica.created ? new Date(replica.created) : null;
  let restartCount = parseInt(replica.restartCount);
  replica.restartCount = Number.isNaN(restartCount) ? 0 : restartCount;
  return Object.freeze(replica);
};

export default normaliser;
