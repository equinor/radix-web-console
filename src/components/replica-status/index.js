import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import Chip from '../chip';

const STATUS_FAIL = 'Failing';

export const ReplicaStatus = ({ replica }) => {
  const status = replica ? replica.status : null;
  if (status === STATUS_FAIL) {
    return (
      <Chip type="danger">
        <FontAwesomeIcon icon={faExclamationCircle} /> Failing
      </Chip>
    );
  }

  return <Chip>{status}</Chip>;
};

export default ReplicaStatus;
