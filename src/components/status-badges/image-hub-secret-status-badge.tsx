import { Icon } from '@equinor/eds-core-react';
import { check, time } from '@equinor/eds-icons';

import {
  StatusBadgeTemplate,
  type StatusBadgeTemplateProps,
} from './status-badge-template';

import type { ImageHubSecret } from '../../store/radix-api';

type StatusType = Required<ImageHubSecret>['status'];
const BadgeTemplates = {
  Pending: { icon: <Icon data={time} /> },
  Consistent: { icon: <Icon data={check} /> },
} satisfies Record<StatusType, StatusBadgeTemplateProps>;

type Props = { status: StatusType };
export const ImageHubSecretStatusBadge = ({ status }: Props) => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);
