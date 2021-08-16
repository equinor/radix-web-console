import React from 'react';
import StatusBadge from '../status-badge';

const STATUS_FAIL = 'Failing';

export const ScheduledJobStatus = ({ status }) => {
  if (status === STATUS_FAIL) {
    return <StatusBadge type="danger">Failing</StatusBadge>;
  }

  return <StatusBadge type={status}>{status}</StatusBadge>;
};

export default ScheduledJobStatus;
