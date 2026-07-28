import type { StatusPopoverType } from '../../../status-popover/status-popover'
import type { Severity, Thresholds } from './environmentCardUtilizationStatus.types'

export const CpuThresholds: Thresholds = { low: 0.2, high: 0.8, max: 1.0 }
export const MemoryThresholds: Thresholds = {
  low: 0.2,
  high: 0.7,
  max: 0.9,
}

export const SeverityMap = {
  None: { label: 'Normal Utilization', type: 'default' },
  Information: { label: 'Low Utilization', type: 'default' },
  Warning: { label: 'High Utilization', type: 'warning' },
  Critical: { label: 'Critical Utilization', type: 'danger' },
} satisfies Record<Severity, { label: string; type: StatusPopoverType }>
