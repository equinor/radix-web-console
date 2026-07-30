import { useMemo } from 'react'
import type { Component, DeploymentSummary, ReplicaResourcesUtilizationResponse } from '../../../../store/radix-api'
import type { EnvironmentVulnerabilities } from '../../../../store/scan-api'
import styles from '../../environmentCard.module.css'
import { EnvironmentCardEnvironmentStatus } from './environment-card-environment-status/EnvironmentCardEnvironmentStatus'
import { buildEnvironmentStatusElements } from './environment-card-environment-status/environmentCardEnvironmentStatus.utils'
import { EnvironmentCardUtilizationStatus } from './environment-card-utilization-status/EnvironmentCardUtilizationStatus'
import { getEnvironmentReplicas } from './environment-card-utilization-status/environmentCardUtilizationStatus.utils'
import { EnvironmentCardVulnerabilityStatus } from './environment-card-vulnerability-status/EnvironmentCardVulnerabilityStatus'
import { summarizeEnvironmentVulnerabilities } from './environment-card-vulnerability-status/environmentCardVulnerabilityStatus.utils'

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
  const replicas = getEnvironmentReplicas(utilization, environmentName)
  const vulnerabilities = summarizeEnvironmentVulnerabilities(envScan)

  const statusElements = useMemo(
    () => buildEnvironmentStatusElements(deploymentStatus, components),
    [deploymentStatus, components]
  )

  return (
    <div className={styles.statuses}>
      <EnvironmentCardUtilizationStatus replicas={replicas} />
      <EnvironmentCardVulnerabilityStatus summary={vulnerabilities} />
      <EnvironmentCardEnvironmentStatus statusElements={statusElements} />
    </div>
  )
}
