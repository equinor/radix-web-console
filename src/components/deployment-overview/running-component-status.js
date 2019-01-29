import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import Chip from '../chip';

const STATUS_FAIL = 'Failing';

export const RunningComponentStatus = ({ replicas }) => {
  if (replicas.some(replica => replica.replicaStatus.status === STATUS_FAIL)) {
    return (
      <Chip type="danger">
        <FontAwesomeIcon icon={faExclamationCircle} /> Failing
      </Chip>
    );
  }

  return <Chip type="info">OK</Chip>;
};

export default RunningComponentStatus;
