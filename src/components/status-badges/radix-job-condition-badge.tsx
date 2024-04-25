import { CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  check,
  error_outlined,
  stop,
  time,
  traffic_light,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { ComponentProps, FunctionComponent } from 'react';

import { StatusBadgeTemplate } from './status-badge-template';

import {
  JobSummary,
  ScheduledBatchSummary,
  ScheduledJobSummary,
  Step,
} from '../../store/radix-api';

type BadgeProps = ComponentProps<typeof StatusBadgeTemplate>;
type JobSummaryStatus =
  | Step['status']
  | JobSummary['status']
  | ScheduledBatchSummary['status']
  | ScheduledJobSummary['status'];

export const JobConditionBadgeTemplates = {
  Waiting: { icon: <Icon data={traffic_light} /> },
  Queued: { icon: <Icon data={time} /> },
  Running: { icon: <CircularProgress /> },
  Succeeded: { icon: <Icon data={check} /> },
  Stopping: { icon: <CircularProgress /> },
  Stopped: { icon: <Icon data={stop} /> },
  Active: { icon: <Icon data={time} /> },
  StoppedNoChanges: { icon: <Icon data={stop} /> },
  Failed: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
} satisfies Record<JobSummaryStatus, BadgeProps>;

export const RadixJobConditionBadge: FunctionComponent<{
  status: JobSummaryStatus;
}> = ({ status }) => (
  <StatusBadgeTemplate {...JobConditionBadgeTemplates[status]}>
    {status == 'Active' ? 'Starting' : status}
  </StatusBadgeTemplate>
);

RadixJobConditionBadge.propTypes = {
  status: PropTypes.string.isRequired as PropTypes.Validator<JobSummaryStatus>,
};
