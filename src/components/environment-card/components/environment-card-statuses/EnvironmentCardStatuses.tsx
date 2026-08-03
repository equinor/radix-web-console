import { useMemo } from 'react'
import type { Component, DeploymentSummary, ReplicaResourcesUtilizationResponse } from '../../../../store/radix-api'
import type { EnvironmentVulnerabilities } from '../../../../store/scan-api'
import { UtilizationStatusPopover } from '../../common/utilization-status-popover/UtilizationStatusPopover'
import { getEnvironmentReplicaUtilizations } from '../../common/utilization-status-popover/utilizationStatusPopover.utils'
import { VulnerabilityStatusPopover } from '../../common/vulnerability-status-popover/VulnerabilityStatusPopover'
import { summarizeEnvironmentVulnerabilities } from '../../common/vulnerability-status-popover/vulnerabilityStatusPopover.utils'
import styles from '../../environmentCard.module.css'
import {
  buildEnvironmentStatusElements,
  EnvironmentCardEnvironmentStatus,
} from './environment-card-environment-status/EnvironmentCardEnvironmentStatus'
import EnvironmentCardEnvironmentStatus2 from './environment-card-environment-status/wip/components/EnvironmentCardEnvironmentStatus2'

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

  const statusElements = useMemo(
    () => buildEnvironmentStatusElements(deploymentStatus, components),
    [deploymentStatus, components]
  )

  return (
    <div className={styles.statuses}>
      <UtilizationStatusPopover replicaUtilizations={replicaUtilizations} />
      <VulnerabilityStatusPopover summary={vulnerabilities} />
      <EnvironmentCardEnvironmentStatus statusElements={statusElements} />
      <EnvironmentCardEnvironmentStatus2
        latestDeployment={{
          status: deploymentStatus ?? 'Inactive',
        }}
        components={components}
      />
    </div>
  )
}
