import { CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  blocked,
  check,
  error_outlined,
  run,
  time,
  traffic_light,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';

import {
  StatusBadgeTemplate,
  type StatusBadgeTemplateProps,
} from './status-badge-template';

import type {
  ScheduledBatchSummary,
  ScheduledJobSummary,
} from '../../store/radix-api';

type JobSchedulerProgressStatus =
  | ScheduledBatchSummary['status']
  | ScheduledJobSummary['status'];

const BadgeTemplates: Record<
  JobSchedulerProgressStatus,
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

export const ProgressStatusBadge: FunctionComponent<{
  status: JobSchedulerProgressStatus;
}> = ({ status }) => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status === 'Active' ? 'Starting' : status}
  </StatusBadgeTemplate>
);

ProgressStatusBadge.propTypes = {
  status: PropTypes.string
    .isRequired as PropTypes.Validator<JobSchedulerProgressStatus>,
};
