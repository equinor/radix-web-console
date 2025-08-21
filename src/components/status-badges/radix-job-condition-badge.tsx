import { CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  check,
  error_outlined,
  stop,
  time,
  traffic_light,
} from '@equinor/eds-icons';
import type {
  JobSummary,
  ScheduledBatchSummary,
  ScheduledJobSummary,
  Step,
} from '../../store/radix-api';
import {
  StatusBadgeTemplate,
  type StatusBadgeTemplateProps,
} from './status-badge-template';

type JobSummaryStatus =
  | Required<Step>['status']
  | Required<JobSummary>['status']
  | ScheduledBatchSummary['status']
  | ScheduledJobSummary['status'];

export const JobConditionBadgeTemplates = {
  Waiting: { icon: <Icon data={traffic_light} /> },
  Queued: { icon: <Icon data={time} /> },
  Running: { icon: <CircularProgress /> },
  Succeeded: { icon: <Icon data={check} /> },
  Completed: { icon: <Icon data={check} /> },
  Stopping: { icon: <CircularProgress /> },
  Stopped: { icon: <Icon data={stop} /> },
  Active: { icon: <Icon data={time} /> },
  StoppedNoChanges: { icon: <Icon data={stop} /> },
  Failed: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
} satisfies Record<JobSummaryStatus, StatusBadgeTemplateProps>;

type Props = {
  status: JobSummaryStatus;
};
export const RadixJobConditionBadge = ({ status }: Props) => (
  <StatusBadgeTemplate {...JobConditionBadgeTemplates[status]}>
    {status == 'Active' ? 'Starting' : status}
  </StatusBadgeTemplate>
);
