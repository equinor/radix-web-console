import { check, error_outlined, type IconData, warning_outlined } from '@equinor/eds-icons'
import type { StatusBadgeTemplateType } from '../../../../../../../status-badges/status-badge-template'
import type { AlertLevel } from '../../domain/statusMeta.types'

export const AlertLevelWeightMap: Record<AlertLevel, number> = {
  Good: 0,
  Warning: 1,
  Danger: 2,
}

export const AlertLevelPresentationMap: Record<AlertLevel, { type: StatusBadgeTemplateType; icon: IconData }> = {
  Good: { type: 'default', icon: check },
  Warning: { type: 'warning', icon: warning_outlined },
  Danger: { type: 'danger', icon: error_outlined },
}
