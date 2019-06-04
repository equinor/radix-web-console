import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import Chip from '../chip';

const STATUS_FAIL = 'Failing';
const STATUS_PENDING = 'Pending';

export const ActiveComponentStatus = ({
  componentName,
  envSecrets,
  replicas,
}) => {
  if (
    envSecrets.some(
      secret =>
        secret.component === componentName && secret.status === STATUS_PENDING
    )
  ) {
    return (
      <Chip type="danger">
        <FontAwesomeIcon icon={faExclamationCircle} /> Missing secrets
      </Chip>
    );
  }

  if (replicas.some(replica => replica.status === STATUS_FAIL)) {
    return (
      <Chip type="danger">
        <FontAwesomeIcon icon={faExclamationCircle} /> Failing
      </Chip>
    );
  }

  return <Chip>OK</Chip>;
};

export default ActiveComponentStatus;
