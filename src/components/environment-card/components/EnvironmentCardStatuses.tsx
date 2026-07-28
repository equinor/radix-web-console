import { useMemo } from 'react'
import type { Component, DeploymentSummary, ReplicaResourcesUtilizationResponse } from '../../../store/radix-api'
import type { EnvironmentVulnerabilities } from '../../../store/scan-api'
import {
  aggregateComponentReplicaStatus,
  aggregateComponentStatus,
  aggregateDeploymentStatus,
} from '../../environments-summary/environment-status-utils'
import { EnvironmentCardEnvironmentStatus } from './environment-card-environment-status/EnvironmentCardEnvironmentStatus'
import {
  type EnvironmentStatus,
  toEnvironmentStatus,
} from './environment-card-environment-status/environmentCardEnvironmentStatus.utils'
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

export interface EnvironmentStatusElement {
  deployment?: EnvironmentStatus
  components?: EnvironmentStatus
  replicas?: EnvironmentStatus
}

/** Builds the per-resource status map (Deployment, Components and Replicas when present) for an environment. */
const buildEnvironmentStatusElements = (
  deployment?: Pick<DeploymentSummary, 'status'>,
  components?: Component[]
): EnvironmentStatusElement => {
  if (!components || components.length === 0) {
    return {}
  }

  const hasReplicas = components.some(({ replicaList }) => (replicaList?.length ?? 0) > 0)

  return {
    deployment: toEnvironmentStatus(aggregateDeploymentStatus(deployment ? [deployment] : [])),
    components: toEnvironmentStatus(aggregateComponentStatus(components)),
    ...(hasReplicas && { replicas: toEnvironmentStatus(aggregateComponentReplicaStatus(components)) }),
  }
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

  const environmentStatusElements = useMemo(
    () => buildEnvironmentStatusElements(deployment, components),
    [deployment, components]
  )

  return (
    <div>
      <EnvironmentCardUtilizationStatus replicas={replicas} minimumSeverity={'Information'} />
      <EnvironmentCardVulnerabilityStatus summary={vulnerabilitiesSummary} />
      <EnvironmentCardEnvironmentStatus statusElements={environmentStatusElements} />
    </div>
  )
}
