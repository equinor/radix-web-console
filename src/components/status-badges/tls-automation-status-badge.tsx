import { Icon } from '@equinor/eds-core-react'
import { check, error_outlined, time } from '@equinor/eds-icons'
import type { TlsAutomation } from '../../store/radix-api'
import { StatusBadgeTemplate, type StatusBadgeTemplateProps } from './status-badge-template'

type Status = TlsAutomation['status'] | 'Unknown'

const BadgeTemplates: Record<Status, Readonly<Pick<StatusBadgeTemplateProps, 'icon' | 'type'> & { text?: string }>> = {
  Pending: {
    type: 'warning',
    icon: <Icon data={time} />,
    text: 'Order In Progress',
  },
  Success: { icon: <Icon data={check} />, text: 'Order Successful' },
  Failed: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
    text: 'Order Failed',
  },
  Unknown: {
    type: 'warning',
    icon: <Icon data={time} />,
    text: 'Order Status Unknown',
  },
}

type Props = {
  status: Status
}
export function TLSAutomationStatusBadge({ status }: Props) {
  const { type, icon, text } = BadgeTemplates[status]

  return (
    <StatusBadgeTemplate type={type} icon={icon}>
      {text || status}
    </StatusBadgeTemplate>
  )
}
