import { CircularProgress, Icon } from '@equinor/eds-core-react';
import { check, error_outlined, run, time, timer } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import {
  StatusTooltipTemplate,
  StatusTooltipTemplateProps,
} from './status-tooltip-template';

import { ReplicaStatus } from '../../models/replica-status';

const TooltipTemplates: Record<
  ReplicaStatus,
  Pick<StatusTooltipTemplateProps, 'icon' | 'type'>
> = {
  [ReplicaStatus.Pending]: { icon: <Icon data={time} /> },
  [ReplicaStatus.Failing]: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  [ReplicaStatus.Running]: { icon: <Icon data={run} /> },
  [ReplicaStatus.Starting]: { icon: <CircularProgress /> },
  [ReplicaStatus.Queued]: { icon: <Icon data={timer} /> },
  [ReplicaStatus.Succeeded]: { icon: <Icon data={check} /> },
  [ReplicaStatus.Unsupported]: undefined,
  [ReplicaStatus.Terminated]: undefined,
};

export const ReplicaStatusTooltip = ({
  status,
}: {
  status: ReplicaStatus;
}): JSX.Element => (
  <StatusTooltipTemplate title={status} {...TooltipTemplates[status]} />
);

ReplicaStatusTooltip.propTypes = {
  status: PropTypes.oneOf(Object.values(ReplicaStatus)).isRequired,
} as PropTypes.ValidationMap<{ status: ReplicaStatus }>;
