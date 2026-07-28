import { useMemo } from 'react'
import type { Component, DeploymentSummary, ReplicaResourcesUtilizationResponse } from '../../../store/radix-api'
import type { EnvironmentVulnerabilities } from '../../../store/scan-api'
import { DeploymentHeader, VulnerabilityHeader } from '../../environments-summary/environment-headers'
import { EnvironmentCardUtilizationStatus } from './environment-card-utilization-status/EnvironmentCardUtilizationStatus'
import { flattenReplicaUtilization } from './environment-card-utilization-status/environmentCardUtilizationStatus.utils'
import { EnvironmentCardVulnerabilityStatus } from './environment-card-vulnerability-status/EnvironmentCardVulnerabilityStatus'

type VulnerabilitySeverity = 'critical' | 'high' | 'medium' | 'low' | 'unknown'
type VulnerabilitiesSummary = Record<VulnerabilitySeverity, number>

const emptyVulnerabilitiesSummary = (): VulnerabilitiesSummary => ({
  critical: 0,
  high: 0,
  medium: 0,
  low: 0,
  unknown: 0,
})

/** Aggregates the per-severity vulnerability counts across every component and job in an environment. */
const summarizeEnvironmentVulnerabilities = (envScan?: EnvironmentVulnerabilities): VulnerabilitiesSummary => {
  const componentScans = Object.values(envScan?.components ?? {})
  const jobScans = Object.values(envScan?.jobs ?? {})

  return [...componentScans, ...jobScans].reduce<VulnerabilitiesSummary>((total, scan) => {
    for (const [severity, count] of Object.entries(scan.vulnerabilitySummary ?? {})) {
      total[severity as VulnerabilitySeverity] += count
    }
    return total
  }, emptyVulnerabilitiesSummary())
}

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

  const vulnerabilitiesSummary = useMemo(() => summarizeEnvironmentVulnerabilities(envScan), [envScan])

  return (
    <div>
      <EnvironmentCardUtilizationStatus replicas={replicas} minimumSeverity={'Information'} />
      <EnvironmentCardVulnerabilityStatus summary={vulnerabilitiesSummary} />
      <DeploymentHeader components={components} deployment={deployment} />
    </div>
  )
}
