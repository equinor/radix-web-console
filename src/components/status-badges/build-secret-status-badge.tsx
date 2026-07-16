import { Icon } from '@equinor/eds-core-react'
import { check, time } from '@equinor/eds-icons'
import type { BuildSecret } from '../../store/radix-api'
import { StatusBadgeTemplate, type StatusBadgeTemplateProps } from './status-badge-template'

type RequiredStatus = Required<BuildSecret>['status']
export const BuildSecretBadgeTemplates = {
  Pending: { icon: <Icon data={time} /> },
  Consistent: { icon: <Icon data={check} /> },
} satisfies Record<RequiredStatus, StatusBadgeTemplateProps>

type Props = {
  status: BuildSecret['status']
}
export const BuildSecretStatusBadge = ({ status }: Props) => (
  <StatusBadgeTemplate {...BuildSecretBadgeTemplates[status ?? 'Pending']}>{status}</StatusBadgeTemplate>
)
