import { CircularProgress, Icon } from '@equinor/eds-core-react'
import { check, error_outlined, warning_outlined } from '@equinor/eds-icons'
import type { ReactNode } from 'react'
import type { AlertLevel } from '../../../../domain/status-meta/statusMeta.types'
import type { StatusBadgeTemplateType } from '../../../status-badges/status-badge-template'

export const AGGREGATED_STATUS_MAP = {
  None: { type: 'default', icon: <Icon data={check} /> },
  Loading: { type: 'default', icon: <CircularProgress size={16} /> },
  Warning: { type: 'warning', icon: <Icon data={warning_outlined} /> },
  Danger: { type: 'danger', icon: <Icon data={error_outlined} /> },
} as const satisfies Record<AlertLevel, { type: StatusBadgeTemplateType; icon: ReactNode }>
