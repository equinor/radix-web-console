import { CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  blocked,
  check,
  error_outlined,
  traffic_light,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { ProgressStatus } from '../../models/radix-api/jobs/progress-status';

const BadgeTemplates: Record<
  ProgressStatus,
  Pick<StatusBadgeTemplateProps, 'icon' | 'type'>
> = {
  [ProgressStatus.Running]: { icon: <CircularProgress /> },
  [ProgressStatus.Stopping]: { icon: <CircularProgress /> },
  [ProgressStatus.Failed]: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  [ProgressStatus.Waiting]: { icon: <Icon data={traffic_light} /> },
  [ProgressStatus.Stopped]: { icon: <Icon data={blocked} /> },
  [ProgressStatus.StoppedNoChanges]: { icon: <Icon data={blocked} /> },
  [ProgressStatus.Succeeded]: { icon: <Icon data={check} /> },
  [ProgressStatus.Unsupported]: {
    type: 'warning',
    icon: <Icon data={error_outlined} />,
  },
};

export const ProgressStatusBadge = ({
  status,
}: {
  status: ProgressStatus;
}): JSX.Element => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);

ProgressStatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(ProgressStatus)).isRequired,
} as PropTypes.ValidationMap<{ status: ProgressStatus }>;
