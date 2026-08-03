import type { Component, DeploymentSummary, ReplicaResourcesUtilizationResponse } from '../../../../store/radix-api'
import type { EnvironmentVulnerabilities } from '../../../../store/scan-api'
import { UtilizationStatusPopover } from '../../../status-popover/shared/utilization-status-popover/UtilizationStatusPopover'
import { getEnvironmentReplicaUtilizations } from '../../../status-popover/shared/utilization-status-popover/utilizationStatusPopover.utils'
import { VulnerabilityStatusPopover } from '../../../status-popover/shared/vulnerability-status-popover/VulnerabilityStatusPopover'
import { summarizeEnvironmentVulnerabilities } from '../../../status-popover/shared/vulnerability-status-popover/vulnerabilityStatusPopover.utils'
import styles from '../../environmentCard.module.css'
import EnvironmentCardEnvironmentStatus from './EnvironmentCardEnvironmentStatus'

interface EnvironmentCardStatusesProps {
  environmentName: string
  deploymentStatus?: DeploymentSummary['status']
  components?: Component[]
  envScan?: EnvironmentVulnerabilities
  utilization?: ReplicaResourcesUtilizationResponse
}

export const EnvironmentCardStatuses = ({
  environmentName,
  deploymentStatus,
  components,
  envScan,
  utilization,
}: EnvironmentCardStatusesProps) => {
  const replicaUtilizations = getEnvironmentReplicaUtilizations(utilization, environmentName)
  const vulnerabilities = summarizeEnvironmentVulnerabilities(envScan)

  return (
    <div className={styles.statuses}>
      <UtilizationStatusPopover replicaUtilizations={replicaUtilizations} />
      <VulnerabilityStatusPopover summary={vulnerabilities} />
      <EnvironmentCardEnvironmentStatus
        latestDeployment={{
          status: deploymentStatus ?? 'Inactive',
        }}
        components={components}
      />
    </div>
  )
}
