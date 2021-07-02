import React from 'react';

import { StatusBadge } from '../status-badge';

export const ReplicaStatus = ({ replica }) => {
  let status = replica ? replica.status : 'Unknown';
  return <StatusBadge type={status}>{status}</StatusBadge>;
};

export default ReplicaStatus;
