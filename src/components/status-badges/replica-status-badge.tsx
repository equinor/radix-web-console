import { CircularProgress, Icon } from '@equinor/eds-core-react';
import { check, error_outlined, run, time, timer } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { ReplicaStatusEnum } from '../../models/replica-status-enum';

const BadgeTemplates: {
  [key: string]: StatusBadgeTemplateProps;
} = {
  [ReplicaStatusEnum.Pending]: { icon: <Icon data={time} /> },
  [ReplicaStatusEnum.Failing]: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  [ReplicaStatusEnum.Running]: { icon: <Icon data={run} /> },
  [ReplicaStatusEnum.Starting]: { icon: <CircularProgress /> },
  [ReplicaStatusEnum.Queued]: { icon: <Icon data={timer} /> },
  [ReplicaStatusEnum.Succeeded]: {
    type: 'success',
    icon: <Icon data={check} />,
  },
};

export const ReplicaStatusBadge = ({
  status,
}: {
  status: ReplicaStatusEnum;
}): JSX.Element => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);

ReplicaStatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(ReplicaStatusEnum)).isRequired,
} as PropTypes.ValidationMap<{ status: ReplicaStatusEnum }>;
