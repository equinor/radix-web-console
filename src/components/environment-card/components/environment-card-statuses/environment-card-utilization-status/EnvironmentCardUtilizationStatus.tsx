import { Icon } from '@equinor/eds-core-react'
import { pressure } from '@equinor/eds-icons'
import { StatusBadgeTemplate } from '../../../../status-badges/status-badge-template'
import { StatusPopover } from '../../../../status-popover/status-popover'
import { MINIMUM_SEVERITY, SEVERITY_MAP } from './environmentCardUtilizationStatus.const'
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
      <div className="">
        <StatusBadgeTemplate type={SEVERITY_MAP[highestMemoryAlert.severity].type}>
          Memory {highestMemoryAlert.reason}
        </StatusBadgeTemplate>
        <StatusBadgeTemplate type={SEVERITY_MAP[highestCPUAlert.severity].type}>
          CPU {highestCPUAlert.reason}
        </StatusBadgeTemplate>
      </div>
    </StatusPopover>
  )
}
