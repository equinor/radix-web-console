import { Icon } from '@equinor/eds-core-react'
import { check, error_outlined, stop, time } from '@equinor/eds-icons'
import type { Secret } from '../../store/radix-api'
import { StatusBadgeTemplate, type StatusBadgeTemplateProps } from './status-badge-template'

type SecretStatus = Required<Secret>['status']

const Unsupported = {
  type: 'warning',
  icon: <Icon data={error_outlined} />,
}
const BadgeTemplates = {
  Pending: { type: 'warning', icon: <Icon data={time} /> },
  Consistent: { icon: <Icon data={check} /> },
  NotAvailable: {
    type: 'danger',
    icon: <Icon data={stop} />,
    children: 'Not available',
  },
} satisfies Record<SecretStatus, StatusBadgeTemplateProps>

type Props = {
  status?: SecretStatus
}
export const ComponentSecretStatusBadge = ({ status }: Props) => {
  const props = status ? BadgeTemplates[status] : Unsupported
  return <StatusBadgeTemplate {...props}>{status}</StatusBadgeTemplate>
}
