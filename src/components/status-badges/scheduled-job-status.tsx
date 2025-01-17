import { CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  blocked,
  check,
  error_outlined,
  run,
  time,
  traffic_light,
} from '@equinor/eds-icons';
import type { FunctionComponent } from 'react';

import {
  StatusBadgeTemplate,
  type StatusBadgeTemplateProps,
} from './status-badge-template';

import type { ScheduledJobSummary } from '../../store/radix-api';

type StatusType = ScheduledJobSummary['status'];

const BadgeTemplates: Record<StatusType, StatusBadgeTemplateProps> = {
  Running: { icon: <Icon data={run} />, title: 'dsfsdf' },
  Active: { icon: <Icon data={time} />, title: 'dsfsdf' },
  Succeeded: { icon: <Icon data={check} /> },
  Completed: { icon: <Icon data={check} /> },
  Failed: { type: 'danger', icon: <Icon data={error_outlined} /> },
  Waiting: { icon: <Icon data={traffic_light} /> },
  Stopping: { icon: <CircularProgress /> },
  Stopped: { icon: <Icon data={blocked} /> },
};

export const ScheduledJobStatusBadge: FunctionComponent<{
  status: StatusType;
}> = ({ status }) => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);
