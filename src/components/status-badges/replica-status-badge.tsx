import { CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  check_circle_outlined,
  error_outlined,
  run,
  stop,
  time,
} from '@equinor/eds-icons';

import {
  StatusBadgeTemplate,
  type StatusBadgeTemplateProps,
} from './status-badge-template';

import type { ReplicaSummary } from '../../store/radix-api';

type Status = Required<ReplicaSummary>['replicaStatus']['status'];

const BadgeTemplates = {
  Pending: { icon: <Icon data={time} /> },
  Failed: { type: 'danger', icon: <Icon data={error_outlined} /> },
  Failing: { type: 'danger', icon: <Icon data={error_outlined} /> },
  Succeeded: { icon: <Icon data={check_circle_outlined} /> },
  Running: { icon: <Icon data={run} /> },
  Starting: { icon: <CircularProgress /> },
  Stopped: { icon: <Icon data={stop} /> },
  Terminated: { icon: <Icon data={stop} /> },
} satisfies Record<Status, StatusBadgeTemplateProps>;

type Props = {
  status: Status;
};
export const ReplicaStatusBadge = ({ status }: Props) => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);
