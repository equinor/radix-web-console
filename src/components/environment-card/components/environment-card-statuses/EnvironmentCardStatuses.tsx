import type { ReplicaUtilization } from '../../../../store/radix-api'
import { AggregatedStatusPopover } from '../../../status-popover/shared/aggregated-status-popover/AggregatedStatusPopover'
import type { StatusItem } from '../../../status-popover/shared/aggregated-status-popover/aggregatedStatusPopover.types'
import { UtilizationStatusPopover } from '../../../status-popover/shared/utilization-status-popover/UtilizationStatusPopover'
import { VulnerabilityStatusPopover } from '../../../status-popover/shared/vulnerability-status-popover/VulnerabilityStatusPopover'
import type { VulnerabilityCounts } from '../../../status-popover/shared/vulnerability-status-popover/vulnerabilityStatusPopover.utils'
import styles from '../../environmentCard.module.css'

interface EnvironmentCardStatusesProps {
  readonly replicaUtilizations: ReadonlyArray<ReplicaUtilization>
  readonly vulnerabilities: VulnerabilityCounts
  readonly environmentStatusItems: ReadonlyArray<StatusItem>
}

export const EnvironmentCardStatuses = (props: EnvironmentCardStatusesProps) => {
  const { replicaUtilizations, vulnerabilities, environmentStatusItems } = props

  return (
    <div className={styles.statuses}>
      <UtilizationStatusPopover replicaUtilizations={replicaUtilizations} />
      <VulnerabilityStatusPopover summary={vulnerabilities} />
      <AggregatedStatusPopover title="Environment Status" items={environmentStatusItems} />
    </div>
  )
}
