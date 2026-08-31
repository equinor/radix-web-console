import { Icon } from '@equinor/eds-core-react'
import { check, error_outlined } from '@equinor/eds-icons'
import type { Secret } from '../../store/radix-api'
import { StatusBadgeTemplate, type StatusBadgeTemplateProps } from './status-badge-template'

type SecretStatus = Required<Secret>['status']

const UNSUPPORTED_STATUS: StatusBadgeTemplateProps = {
  type: 'warning',
  icon: <Icon data={error_outlined} />,
  children: 'Unsupported status',
} as const

export const COMPONENT_SECRET_STATUS_MAP = {
  Pending: { type: 'danger', icon: <Icon data={error_outlined} />, children: 'Missing' },
  Consistent: { icon: <Icon data={check} />, children: 'Configured' },
  NotAvailable: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
    children: 'Not available',
  },
} satisfies Record<SecretStatus, StatusBadgeTemplateProps>

interface ComponentSecretStatusBadgeProps {
  status?: SecretStatus
}

export const ComponentSecretStatusBadge = ({ status }: ComponentSecretStatusBadgeProps) => {
  const props = status ? COMPONENT_SECRET_STATUS_MAP[status] : UNSUPPORTED_STATUS

  return <StatusBadgeTemplate {...props} />
}
