import { check, error_outlined, type IconData, warning_outlined } from '@equinor/eds-icons'
import type { AlertLevel } from '../../../../domain/status-meta/statusMeta.types'
import type { StatusBadgeTemplateType } from '../../../status-badges/status-badge-template'

export const AlertLevelWeightMap = {
  None: 0,
  Warning: 1,
  Danger: 2,
} as const satisfies Record<AlertLevel, number>

export const AlertLevelPresentationMap = {
  None: { type: 'default', icon: check },
  Warning: { type: 'warning', icon: warning_outlined },
  Danger: { type: 'danger', icon: error_outlined },
} as const satisfies Record<AlertLevel, { type: StatusBadgeTemplateType; icon: IconData }>
