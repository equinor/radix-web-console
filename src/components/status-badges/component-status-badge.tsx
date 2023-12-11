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

import { ComponentStatus as OldComponentStatus } from '../../models/radix-api/deployments/component-status';
import { AuxiliaryResourceDeployment, Component } from '../../store/radix-api';

type ComponentStatus = (AuxiliaryResourceDeployment | Component)['status'];

const BadgeTemplates: Record<
  OldComponentStatus | ComponentStatus,
  Pick<StatusBadgeTemplateProps, 'icon' | 'type'>
> = {
  Reconciling: { icon: <CircularProgress /> },
  Restarting: { icon: <CircularProgress /> },
  Stopped: { icon: <Icon data={stop} /> },
  Outdated: { type: 'warning', icon: <Icon data={info_circle} /> },
  Consistent: { icon: <Icon data={check_circle_outlined} /> },

  // deprecated
  Unsupported: { type: 'warning', icon: <Icon data={error_outlined} /> },
};

export const ComponentStatusBadge: FunctionComponent<{
  status: OldComponentStatus | ComponentStatus;
}> = ({ status }) => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);

ComponentStatusBadge.propTypes = {
  status: PropTypes.string.isRequired as PropTypes.Validator<ComponentStatus>,
};
