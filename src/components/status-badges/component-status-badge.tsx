import { CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  check_circle_outlined,
  error_outlined,
  info_circle,
  stop,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { ComponentStatus } from '../../models/radix-api/deployments/component-status';

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
  [ComponentStatus.Unsupported]: {
    type: 'warning',
    icon: <Icon data={error_outlined} />,
  },
};

export const ComponentStatusBadge: FunctionComponent<{
  status: ComponentStatus;
}> = ({ status }) => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);

ComponentStatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(ComponentStatus)).isRequired,
};
