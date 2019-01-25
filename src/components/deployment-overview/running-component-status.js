import React from 'react';

import Chip from '../chip';

const STATUS_FAIL = 'Failing';

export const RunningComponentStatus = ({ replicas }) => {
  if (replicas.some(replica => replica.replicaStatus === STATUS_FAIL)) {
    return <Chip type="danger">Not OK</Chip>;
  }

  return <Chip type="info">OK</Chip>;
};

export default RunningComponentStatus;
