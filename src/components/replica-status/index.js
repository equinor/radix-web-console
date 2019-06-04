import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import Chip from '../chip';

const STATUS_FAIL = 'Failing';

export const ReplicaStatus = ({ replica }) => {
  if (replica.status === STATUS_FAIL) {
    return (
      <Chip type="danger">
        <FontAwesomeIcon icon={faExclamationCircle} /> Failing
      </Chip>
    );
  }

  return <Chip>{replica.status}</Chip>;
};

export default ReplicaStatus;
