import type { IconData } from '@equinor/eds-icons'
import type { AlertLevel } from '../../../environment-card/components/environment-card-statuses/environment-card-environment-status/wip/domain/statusMeta.types'

export type StatusItem = {
  /** Alert level used for deciding the aggregated status and the color for popover badge */
  alertLevel: AlertLevel
  /** Label displayed in the popover */
  label: string
  /** Icon displayed in the popover */
  icon: IconData
}
