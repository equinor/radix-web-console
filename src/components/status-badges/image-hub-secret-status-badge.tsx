import { Icon } from '@equinor/eds-core-react'
import { check, time } from '@equinor/eds-icons'
import type { ImageHubSecret } from '../../store/radix-api'
import { StatusBadgeTemplate, type StatusBadgeTemplateProps } from './status-badge-template'

type StatusType = Required<ImageHubSecret>['status']
export const ImageHubSecretBadgeTemplates = {
  Pending: { icon: <Icon data={time} /> },
  Consistent: { icon: <Icon data={check} /> },
} satisfies Record<StatusType, StatusBadgeTemplateProps>

type Props = { status: StatusType }
export const ImageHubSecretStatusBadge = ({ status }: Props) => (
  <StatusBadgeTemplate {...ImageHubSecretBadgeTemplates[status]}>{status}</StatusBadgeTemplate>
)
