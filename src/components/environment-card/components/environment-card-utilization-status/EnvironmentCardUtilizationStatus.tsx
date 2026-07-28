import { Icon } from '@equinor/eds-core-react'
import { pressure } from '@equinor/eds-icons'
import { StatusBadgeTemplate } from '../../../status-badges/status-badge-template'
import { StatusPopover } from '../../../status-popover/status-popover'
import { SeverityMap } from './environmentCardUtilizationStatus.const'
import type { ReplicaUtilization, Severity } from './environmentCardUtilizationStatus.types'
import { getHighestCPUAlert, getHighestMemoryAlert, getHighestSeverity } from './environmentCardUtilizationStatus.utils'

export interface EnvironmentCardUtilizationStatusProps {
  replicas: ReplicaUtilization[]
  showLabel?: boolean
  minimumSeverity?: Severity
}

export const EnvironmentCardUtilizationStatus = ({
  replicas,
  showLabel,
  minimumSeverity,
}: EnvironmentCardUtilizationStatusProps) => {
  const highestMemoryAlert = getHighestMemoryAlert(replicas)
  const highestCPUAlert = getHighestCPUAlert(replicas)
  const severity = getHighestSeverity(highestMemoryAlert, highestCPUAlert)

  if (minimumSeverity !== undefined && severity.severity < minimumSeverity) {
    return null
  }

  return (
    <StatusPopover
      icon={<Icon data={pressure} />}
      title="Resource Utilization Status"
      label={showLabel ? SeverityMap[severity.severity].label : undefined}
      type={SeverityMap[severity.severity].type}
      disablePopover={severity.severity === 'None'}
    >
      <div className={'grid grid--gap-small'}>
        <StatusBadgeTemplate type={SeverityMap[highestMemoryAlert.severity].type}>
          Memory {highestMemoryAlert.reason}
        </StatusBadgeTemplate>
        <StatusBadgeTemplate type={SeverityMap[highestCPUAlert.severity].type}>
          CPU {highestCPUAlert.reason}
        </StatusBadgeTemplate>
      </div>
    </StatusPopover>
  )
}
