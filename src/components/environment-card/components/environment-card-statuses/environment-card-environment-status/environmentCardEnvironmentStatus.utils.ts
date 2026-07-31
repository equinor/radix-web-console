import type { Component, DeploymentSummary } from '../../../../../store/radix-api'

import {
  aggregateComponentReplicaStatus,
  aggregateComponentStatus,
  aggregateDeploymentStatus,
} from '../../../common/utils'
import type { EnvironmentStatusElements } from './environmentCardEnvironmentStatus.types'

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
