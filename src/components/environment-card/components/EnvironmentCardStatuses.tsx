import { useMemo } from 'react'
import type { Component, DeploymentSummary, ReplicaResourcesUtilizationResponse } from '../../../store/radix-api'
import type { EnvironmentVulnerabilities } from '../../../store/scan-api'
import { DeploymentHeader, VulnerabilityHeader } from '../../environments-summary/environment-headers'
import { EnvironmentCardUtilizationStatus } from './environment-card-utilization-status/EnvironmentCardUtilizationStatus'
import { flattenReplicaUtilization } from './environment-card-utilization-status/environmentCardUtilizationStatus.utils'

interface EnvironmentCardStatusesProps {
  environmentName: string
  deployment?: Pick<DeploymentSummary, 'status'>
  components?: Component[]
  envScan?: EnvironmentVulnerabilities
  utilization?: ReplicaResourcesUtilizationResponse
}

export const EnvironmentCardStatuses = ({
  environmentName,
  deployment,
  components,
  envScan,
  utilization,
}: EnvironmentCardStatusesProps) => {
  // Dont like this
  const replicas = useMemo(
    () =>
      flattenReplicaUtilization(utilization)
        .filter(({ key }) => key.startsWith(`${environmentName}.`))
        .map(({ replica }) => replica),
    [utilization, environmentName]
  )

  return (
    <div>
      <EnvironmentCardUtilizationStatus replicas={replicas} minimumSeverity={'Information'} />
      <VulnerabilityHeader envScan={envScan} />
      <DeploymentHeader components={components} deployment={deployment} />
    </div>
  )
}
