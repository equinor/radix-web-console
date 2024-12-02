import { Icon } from '@equinor/eds-core-react';
import { check, time } from '@equinor/eds-icons';
import {
  StatusBadgeTemplate,
  type StatusBadgeTemplateProps,
} from './status-badge-template';

import type { BuildSecret } from '../../store/radix-api';

type RequiredStatus = Required<BuildSecret>['status'];
const BadgeTemplates = {
  Pending: { icon: <Icon data={time} /> },
  Consistent: { icon: <Icon data={check} /> },
} satisfies Record<RequiredStatus, StatusBadgeTemplateProps>;

type Props = {
  status: BuildSecret['status'];
};
export const BuildSecretStatusBadge = ({ status }: Props) => (
  <StatusBadgeTemplate {...BadgeTemplates[status ?? 'Pending']}>
    {status}
  </StatusBadgeTemplate>
);
