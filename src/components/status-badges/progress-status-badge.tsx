import { CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  blocked,
  check,
  error_outlined,
  traffic_light,
  warning_outlined,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { JobSchedulerProgressStatus } from '../../models/radix-api/deployments/job-scheduler-progress-status';
import { ProgressStatus } from '../../models/radix-api/jobs/progress-status';

const BadgeTemplates: Record<
  JobSchedulerProgressStatus | ProgressStatus,
  Pick<StatusBadgeTemplateProps, 'icon' | 'type'>
> = {
  Running: { icon: <CircularProgress /> },
  Stopping: { icon: <CircularProgress /> },
  Failed: { type: 'danger', icon: <Icon data={error_outlined} /> },
  Waiting: { icon: <Icon data={traffic_light} /> },
  Stopped: { icon: <Icon data={blocked} /> },
  [ProgressStatus.StoppedNoChanges]: { icon: <Icon data={blocked} /> },
  Succeeded: { icon: <Icon data={check} /> },
  Unsupported: { type: 'warning', icon: <Icon data={error_outlined} /> },
  [JobSchedulerProgressStatus.DeadlineExceeded]: {
    type: 'warning',
    icon: <Icon data={warning_outlined} />,
  },
};

export const ProgressStatusBadge = ({
  status,
}: {
  status: JobSchedulerProgressStatus | ProgressStatus;
}): JSX.Element => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);

ProgressStatusBadge.propTypes = {
  status: PropTypes.oneOf(
    Object.values({ ...JobSchedulerProgressStatus, ...ProgressStatus })
  ).isRequired,
} as PropTypes.ValidationMap<{
  status: JobSchedulerProgressStatus | ProgressStatus;
}>;
