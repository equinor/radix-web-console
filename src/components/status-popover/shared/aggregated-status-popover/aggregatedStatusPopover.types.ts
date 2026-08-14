import type { ReactElement } from 'react'
import type { AlertLevel } from '../../../../domain/status-meta/statusMeta.types'

export type StatusItem = {
  /** Alert level used for deciding the aggregated status and the color for popover badge */
  alertLevel: AlertLevel
  /** Label displayed in the popover */
  label: string
  /** Icon displayed in the popover */
  icon: ReactElement
}
