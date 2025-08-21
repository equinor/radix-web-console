import { CircularProgress, Icon } from '@equinor/eds-core-react';
import { check_circle_outlined, info_circle, stop } from '@equinor/eds-icons';
import type { FunctionComponent } from 'react';
import type {
  AuxiliaryResourceDeployment,
  Component,
} from '../../store/radix-api';
import {
  StatusBadgeTemplate,
  type StatusBadgeTemplateProps,
} from './status-badge-template';

type ComponentStatus = Required<
  AuxiliaryResourceDeployment | Component
>['status'];

const BadgeTemplates = {
  Reconciling: { icon: <CircularProgress /> },
  Restarting: { icon: <CircularProgress /> },
  Stopped: { icon: <Icon data={stop} /> },
  Outdated: { type: 'warning', icon: <Icon data={info_circle} /> },
  Consistent: { icon: <Icon data={check_circle_outlined} /> },
} satisfies Record<ComponentStatus, StatusBadgeTemplateProps>;

export const ComponentStatusBadge: FunctionComponent<{
  status: ComponentStatus;
}> = ({ status }) => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);
