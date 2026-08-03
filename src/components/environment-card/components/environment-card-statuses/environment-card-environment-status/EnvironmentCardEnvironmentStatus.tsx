import { upperFirst } from 'lodash-es'
import { memo } from 'react'
import { Component, DeploymentSummary } from '../../../../../store/radix-api'
import { AggregatedStatusPopover } from '../../../../aggregated-status-popover/AggregatedStatusPopover'
import type { StatusItem } from '../../../../aggregated-status-popover/aggregatedStatusPopover.types'
import {
  aggregateComponentReplicaStatus,
  aggregateComponentStatus,
  aggregateDeploymentStatus,
} from '../../../common/utils'

export type EnvironmentStatus = 'Consistent' | 'Running' | 'Starting' | 'Stopped' | 'Warning' | 'Danger'

export interface EnvironmentStatusElements {
  deployment?: EnvironmentStatus
  components?: EnvironmentStatus
  replicas?: EnvironmentStatus
}

interface EnvironmentCardEnvironmentStatusProps {
  statusElements: EnvironmentStatusElements
}

export const EnvironmentCardEnvironmentStatusComponent = (props: EnvironmentCardEnvironmentStatusProps) => {
  const items: StatusItem[] = Object.entries(props.statusElements).map(([key, status]) => ({
    label: upperFirst(key),
    status,
  }))

  return <AggregatedStatusPopover title="Environment Status" items={items} />
}

export const EnvironmentCardEnvironmentStatus = memo(EnvironmentCardEnvironmentStatusComponent)

/** Builds the per-resource status map (Deployment, Components and Replicas when present) for an environment. */
export const buildEnvironmentStatusElements = (
  deploymentStatus?: DeploymentSummary['status'],
  components?: Component[]
): EnvironmentStatusElements => {
  if (!components || components.length === 0) {
    return {}
  }

  const hasReplicas = components.some(({ replicaList }) => (replicaList?.length ?? 0) > 0)

  return {
    deployment: aggregateDeploymentStatus(deploymentStatus ? [{ status: deploymentStatus }] : []),
    components: aggregateComponentStatus(components),
    ...(hasReplicas && { replicas: aggregateComponentReplicaStatus(components) }),
  }
}
