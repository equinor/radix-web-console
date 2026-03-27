import { CircularProgress, Icon } from '@equinor/eds-core-react'
import { check_circle_outlined, error_outlined, stop } from '@equinor/eds-icons'
import type { Deployment, DeploymentSummary } from '../../store/radix-api'
import { StatusBadgeTemplate, type StatusBadgeTemplateProps } from './status-badge-template'

type DeploymentStatus = Required<Deployment | DeploymentSummary>['status']

const BadgeTemplates = {
  Reconciling: { icon: <CircularProgress /> },
  Failed: { type: 'danger', icon: <Icon data={error_outlined} /> },
  Inactive: { type: 'none', icon: <Icon data={stop} /> },
  Ready: { icon: <Icon data={check_circle_outlined} /> },
} satisfies Record<DeploymentStatus, StatusBadgeTemplateProps>

export const DeploymentStatusBadge = ({ status }: { status: DeploymentStatus }) => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>{status}</StatusBadgeTemplate>
)
