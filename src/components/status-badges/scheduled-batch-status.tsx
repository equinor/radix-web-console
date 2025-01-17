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

import type { ScheduledBatchSummary } from '../../store/radix-api';

type StatusType = ScheduledBatchSummary['status'];

const BadgeTemplates: Record<
  ScheduledBatchSummary['status'],
  Pick<StatusBadgeTemplateProps, 'icon' | 'type'>
> = {
  Running: { icon: <Icon data={run} /> },
  Active: { icon: <Icon data={time} /> },
  Succeeded: { icon: <Icon data={check} /> },
  Completed: { icon: <Icon data={check} /> },
  Failed: { type: 'danger', icon: <Icon data={error_outlined} /> },
  Waiting: { icon: <Icon data={traffic_light} /> },
  Stopping: { icon: <CircularProgress /> },
  Stopped: { icon: <Icon data={blocked} /> },
};

export const ScheduledBatchStatusBadge: FunctionComponent<{
  status: StatusType;
}> = ({ status }) => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);
