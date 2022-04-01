import { run } from '@equinor/eds-icons';

import { StatusBadge } from '../status-badge';
import { ReplicaStatusEnum } from '../../models/replica-status-enum';

export const ReplicaStatus = ({ replica }) => {
  const status = replica?.status || 'warning';
  return (
    <StatusBadge
      type={status}
      {...(status === ReplicaStatusEnum.Running && { customIconData: run })}
    >
      {status}
    </StatusBadge>
  );
};
