import { Icon, Typography } from '@equinor/eds-core-react'
import { desktop_mac, pressure } from '@equinor/eds-icons'
import type { ReplicaUtilization } from '../../../../store/radix-api'
import { StatusBadgeTemplate } from '../../../status-badges/status-badge-template'
import { StatusPopover } from '../../../status-popover/status-popover'
import { CPU_THRESHOLDS, MEMORY_THRESHOLDS, SEVERITY_MAP } from './utilizationStatusPopover.const'
import type { Severity } from './utilizationStatusPopover.types'

import {
  getHighestCPUAlert,
  getHighestMemoryAlert,
  getHighestSeverity,
  isSeverityAtLeast,
} from './utilizationStatusPopover.utils'

export interface UtilizationStatusPopoverProps {
  replicaUtilizations: ReplicaUtilization[]
  showLabel?: boolean
  minimumSeverity?: Severity
}

/**
 * Displays a popover with the resource utilization status of the replicas.
 * The popover shows the highest severity of CPU and Memory utilization across all replicas.
 * If the highest severity is below the specified minimumSeverity, the popover will not be displayed.
 *
 * @param replicaUtilizations - An array of ReplicaUtilization objects representing the resource utilization of each replica.
 */
export const UtilizationStatusPopover = ({
  replicaUtilizations,
  showLabel,
  minimumSeverity = 'Information',
}: UtilizationStatusPopoverProps) => {
  const highestMemoryAlert = getHighestMemoryAlert(replicaUtilizations)
  const highestCPUAlert = getHighestCPUAlert(replicaUtilizations)

  const highestAlertTotal = getHighestSeverity(highestMemoryAlert, highestCPUAlert)

  const isBelowMinimumSeverity = !isSeverityAtLeast(highestAlertTotal.severity, minimumSeverity)

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
