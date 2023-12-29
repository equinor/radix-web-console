import { CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  check,
  error_outlined,
  stop,
  time,
  traffic_light,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { RadixJobCondition } from '../../models/radix-api/jobs/radix-job-condition';
import {
  JobSummary,
  ScheduledBatchSummary,
  ScheduledJobSummary,
} from '../../store/radix-api';

type JobSummaryStatus =
  | JobSummary['status']
  | ScheduledBatchSummary['status']
  | ScheduledJobSummary['status'];

const BadgeTemplates: Record<
  RadixJobCondition | JobSummaryStatus,
  Pick<StatusBadgeTemplateProps, 'icon' | 'type'>
> = {
  Waiting: { icon: <Icon data={traffic_light} /> },
  Queued: { icon: <Icon data={time} /> },
  Running: { icon: <CircularProgress /> },
  Succeeded: { icon: <Icon data={check} /> },
  Stopping: { icon: <CircularProgress /> },
  Stopped: { icon: <Icon data={stop} /> },
  StoppedNoChanges: { icon: <Icon data={stop} /> },
  Failed: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
};

export const RadixJobConditionBadge: FunctionComponent<{
  status: RadixJobCondition | JobSummaryStatus;
}> = ({ status }) => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);

RadixJobConditionBadge.propTypes = {
  status: PropTypes.string.isRequired as PropTypes.Validator<JobSummaryStatus>,
};
