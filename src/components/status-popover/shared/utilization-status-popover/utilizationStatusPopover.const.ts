import type { StatusPopoverType } from '../../status-popover'
import type { Severity, Thresholds } from './utilizationStatusPopover.types'

export const CPU_THRESHOLDS: Readonly<Thresholds> = { low: 0.2, high: 0.8, max: 1.0 }
export const MEMORY_THRESHOLDS: Readonly<Thresholds> = {
  low: 0.2,
  high: 0.7,
  max: 0.9,
}

export const SEVERITY_MAP = {
  None: { rank: 0, label: 'Normal Utilization', type: 'default' },
  Information: { rank: 1, label: 'Low Utilization', type: 'default' },
  Warning: { rank: 2, label: 'High Utilization', type: 'warning' },
  Critical: { rank: 3, label: 'Critical Utilization', type: 'danger' },
} as const satisfies Record<Severity, { rank: number; label: string; type: StatusPopoverType }>
