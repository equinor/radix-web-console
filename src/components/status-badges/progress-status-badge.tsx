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

const BadgeTemplates: Record<
  JobSchedulerProgressStatus,
  Pick<StatusBadgeTemplateProps, 'icon' | 'type'>
> = {
  [JobSchedulerProgressStatus.Running]: { icon: <CircularProgress /> },
  [JobSchedulerProgressStatus.Succeeded]: { icon: <Icon data={check} /> },
  [JobSchedulerProgressStatus.Failed]: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  [JobSchedulerProgressStatus.Waiting]: { icon: <Icon data={traffic_light} /> },
  [JobSchedulerProgressStatus.Stopping]: { icon: <CircularProgress /> },
  [JobSchedulerProgressStatus.Stopped]: { icon: <Icon data={blocked} /> },
  [JobSchedulerProgressStatus.DeadlineExceeded]: {
    type: 'warning',
    icon: <Icon data={warning_outlined} />,
  },
  [JobSchedulerProgressStatus.Unsupported]: {
    type: 'warning',
    icon: <Icon data={error_outlined} />,
  },
};

export const ProgressStatusBadge = ({
  status,
}: {
  status: JobSchedulerProgressStatus;
}): JSX.Element => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);

ProgressStatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(JobSchedulerProgressStatus)).isRequired,
} as PropTypes.ValidationMap<{ status: JobSchedulerProgressStatus }>;
