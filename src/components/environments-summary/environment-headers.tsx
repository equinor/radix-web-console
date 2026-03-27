import type { Component, DeploymentSummary, ReplicaSummary } from '../../store/radix-api'
import type { EnvironmentVulnerabilities, Vulnerability } from '../../store/scan-api'
import { filterFields } from '../../utils/filter-fields'
import {
  EnvironmentCardStatus,
  type EnvironmentCardStatusMap,
  EnvironmentVulnerabilityIndicator,
} from './environment-card-status'
import {
  aggregateComponentEnvironmentStatus,
  aggregateComponentReplicaEnvironmentStatus,
  EnvironmentStatus,
  environmentVulnerabilitySummarizer,
} from './environment-status-utils'

const visibleKeys: Array<Lowercase<Vulnerability['severity']>> = ['critical', 'high']

type DeploymentHeaderProps = {
  components?: Component[]
  deployment?: Pick<DeploymentSummary, 'status'>
}

export const DeplopymentHeader = ({ components, deployment }: DeploymentHeaderProps) => {
  const replicas = (components ?? []).reduce<Array<ReplicaSummary>>(
    (obj, { replicaList }) => (!replicaList ? obj : [...obj, ...replicaList]),
    []
  )

  const elements: EnvironmentCardStatusMap = {
    Deployment: deployment && deployment.status == 'Failed' ? EnvironmentStatus.Danger : EnvironmentStatus.Consistent,
    Components: aggregateComponentEnvironmentStatus(components ?? []),
    ...(replicas.length > 0 && {
      Replicas: aggregateComponentReplicaEnvironmentStatus(components ?? []),
    }),
  }

  console.log(elements, deployment)
  if (!components || components.length === 0) {
    return null
  }
  return <EnvironmentCardStatus title="Environment status" statusElements={elements} />
}

type VulnerabilityHeaderProps = {
  envScan?: EnvironmentVulnerabilities
}

export const VulnerabilityHeader = ({ envScan }: VulnerabilityHeaderProps) => {
  const vulnerabilities = environmentVulnerabilitySummarizer(envScan)

  if (!visibleKeys.some((key) => vulnerabilities[key] > 0)) return null
  return (
    <EnvironmentVulnerabilityIndicator
      title="Vulnerabilities"
      size={22}
      summary={filterFields(vulnerabilities, visibleKeys)}
      visibleKeys={visibleKeys}
    />
  )
}
