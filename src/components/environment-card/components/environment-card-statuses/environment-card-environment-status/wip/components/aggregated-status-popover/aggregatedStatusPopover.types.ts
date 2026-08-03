import type { IconData } from '@equinor/eds-icons'
import type { AlertLevel } from '../../domain/statusMeta.types'

// A single row in the popover: its resolved alert level and the icon to show.
export type StatusItem = {
  label: string
  alertLevel: AlertLevel
  icon: IconData
}
