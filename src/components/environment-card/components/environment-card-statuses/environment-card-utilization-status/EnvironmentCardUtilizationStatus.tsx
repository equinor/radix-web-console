import { Icon, Typography } from '@equinor/eds-core-react'
import { desktop_mac, pressure } from '@equinor/eds-icons'
import { StatusBadgeTemplate } from '../../../../status-badges/status-badge-template'
import { StatusPopover } from '../../../../status-popover/status-popover'
import {
  CPU_THRESHOLDS,
  MEMORY_THRESHOLDS,
  MINIMUM_SEVERITY,
  SEVERITY_MAP,
} from './environmentCardUtilizationStatus.const'
import type { ReplicaUtilization } from './environmentCardUtilizationStatus.types'
import {
  getHighestCPUAlert,
  getHighestMemoryAlert,
  getHighestSeverity,
  isSeverityAtLeast,
} from './environmentCardUtilizationStatus.utils'

export interface EnvironmentCardUtilizationStatusProps {
  replicas: ReplicaUtilization[]
  showLabel?: boolean
}

export const EnvironmentCardUtilizationStatus = ({ replicas, showLabel }: EnvironmentCardUtilizationStatusProps) => {
  const highestMemoryAlert = getHighestMemoryAlert(replicas)
  const highestCPUAlert = getHighestCPUAlert(replicas)

  const highestAlertTotal = getHighestSeverity(highestMemoryAlert, highestCPUAlert)

  const isBelowMinimumSeverity =
    MINIMUM_SEVERITY !== undefined && !isSeverityAtLeast(highestAlertTotal.severity, MINIMUM_SEVERITY)

  if (isBelowMinimumSeverity) {
    return null
  }

  return (
    <StatusPopover
      icon={<Icon data={pressure} />}
      title="Resource Utilization Status"
      label={showLabel ? SEVERITY_MAP[highestAlertTotal.severity].label : undefined}
      type={SEVERITY_MAP[highestAlertTotal.severity].type}
      disablePopover={highestAlertTotal.severity === 'None'}
    >
      <div className="grid grid--gap-small">
        <StatusBadgeTemplate type={SEVERITY_MAP[highestMemoryAlert.severity].type}>
          Memory {highestMemoryAlert.reason}
        </StatusBadgeTemplate>
        <StatusBadgeTemplate type={SEVERITY_MAP[highestCPUAlert.severity].type}>
          CPU {highestCPUAlert.reason}
        </StatusBadgeTemplate>
      </div>

      <Typography variant="h6">
        See Monitoring <Icon size={16} data={desktop_mac} /> for more details.
      </Typography>

      <br />

      <Typography variant="h6">CPU Limits are based on average usage over the last 24 hours.</Typography>
      <Typography>
        The thresholds are: Critical: {(CPU_THRESHOLDS.max * 100).toFixed()}%, High:{' '}
        {(CPU_THRESHOLDS.high * 100).toFixed()}% and Low: {(CPU_THRESHOLDS.low * 100).toFixed()}%.
      </Typography>
      <Typography variant="h6">Memory Limits are based on maximum usage over the last 24 hours.</Typography>
      <Typography>
        The thresholds are: Critical: {(MEMORY_THRESHOLDS.max * 100).toFixed()}%, High:{' '}
        {(MEMORY_THRESHOLDS.high * 100).toFixed()}% and Low: {(MEMORY_THRESHOLDS.low * 100).toFixed()}%.
      </Typography>
    </StatusPopover>
  )
}
