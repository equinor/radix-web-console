import { CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  check_circle_outlined,
  error_outlined,
  info_circle,
  stop,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { ComponentStatus } from '../../models/component-status';

const BadgeTemplates: Record<
  ComponentStatus,
  Pick<StatusBadgeTemplateProps, 'icon' | 'type'>
> = {
  [ComponentStatus.ComponentReconciling]: { icon: <CircularProgress /> },
  [ComponentStatus.ComponentRestarting]: { icon: <CircularProgress /> },
  [ComponentStatus.StoppedComponent]: { icon: <Icon data={stop} /> },
  [ComponentStatus.ComponentOutdated]: {
    type: 'warning',
    icon: <Icon data={info_circle} />,
  },
  [ComponentStatus.ConsistentComponent]: {
    icon: <Icon data={check_circle_outlined} />,
  },
  [ComponentStatus.Unsupported]: { icon: <Icon data={error_outlined} /> },
};

export const ComponentStatusBadge = ({
  status,
}: {
  status: ComponentStatus;
}): JSX.Element => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);

ComponentStatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(ComponentStatus)).isRequired,
} as PropTypes.ValidationMap<{ status: ComponentStatus }>;
