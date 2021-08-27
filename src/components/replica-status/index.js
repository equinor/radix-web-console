import { run } from '@equinor/eds-icons';
import React from 'react';

import { StatusBadge } from '../status-badge';

export const ReplicaStatus = ({ replica }) => {
  const status = replica ? replica.status : 'warning';
  return (
    <StatusBadge
      type={status}
      {...(status === 'Running' && { customIconData: run })}
    >
      {status}
    </StatusBadge>
  );
};

export default ReplicaStatus;
