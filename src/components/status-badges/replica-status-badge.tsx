import { CircularProgress, Icon } from '@equinor/eds-core-react';
import { check, error_outlined, run, time, timer } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { ReplicaStatus } from '../../models/replica-status';

const BadgeTemplates: {
  [key: string]: StatusBadgeTemplateProps;
} = {
  [ReplicaStatus.Pending]: { icon: <Icon data={time} /> },
  [ReplicaStatus.Failing]: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  [ReplicaStatus.Running]: { icon: <Icon data={run} /> },
  [ReplicaStatus.Starting]: { icon: <CircularProgress /> },
  [ReplicaStatus.Queued]: { icon: <Icon data={timer} /> },
  [ReplicaStatus.Succeeded]: { icon: <Icon data={check} /> },
};

export const ReplicaStatusBadge = ({
  status,
}: {
  status: ReplicaStatus;
}): JSX.Element => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);

ReplicaStatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(ReplicaStatus)).isRequired,
} as PropTypes.ValidationMap<{ status: ReplicaStatus }>;
