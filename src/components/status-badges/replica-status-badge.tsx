import { CircularProgress, Icon } from '@equinor/eds-core-react';
import { error_outlined, run, time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { ReplicaStatus } from '../../models/radix-api/deployments/replica-status';

const BadgeTemplates: Record<
  ReplicaStatus,
  Pick<StatusBadgeTemplateProps, 'icon' | 'type'>
> = {
  [ReplicaStatus.Pending]: { icon: <Icon data={time} /> },
  [ReplicaStatus.Failing]: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  [ReplicaStatus.Running]: { icon: <Icon data={run} /> },
  [ReplicaStatus.Starting]: { icon: <CircularProgress /> },
  [ReplicaStatus.Unsupported]: { icon: <Icon data={error_outlined} /> },
  [ReplicaStatus.Terminated]: undefined,
};

export const ReplicaStatusBadge: FunctionComponent<{
  status: ReplicaStatus;
}> = ({ status }) => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);

ReplicaStatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(ReplicaStatus)).isRequired,
};
