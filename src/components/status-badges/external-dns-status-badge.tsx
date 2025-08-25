import { Icon } from '@equinor/eds-core-react';
import { check, error_outlined, time } from '@equinor/eds-icons';
import type { Tls } from '../../store/radix-api';
import {
  StatusBadgeTemplate,
  type StatusBadgeTemplateProps,
} from './status-badge-template';

type Status = Tls['status'];

const BadgeTemplates: Record<
  Status,
  Readonly<Pick<StatusBadgeTemplateProps, 'icon' | 'type'> & { text?: string }>
> = {
  Pending: { type: 'warning', icon: <Icon data={time} />, text: 'Missing' },
  Consistent: { icon: <Icon data={check} />, text: 'Valid' },
  Invalid: { type: 'danger', icon: <Icon data={error_outlined} /> },
};

type Props = {
  status: Status;
};
export function ExternalDNSStatusBadge({ status }: Props) {
  const { type, icon, text } = BadgeTemplates[status];

  return (
    <StatusBadgeTemplate type={type} icon={icon}>
      {text || status}
    </StatusBadgeTemplate>
  );
}
