import { autorenew, check, error_outlined, type IconData, stop, warning_outlined } from '@equinor/eds-icons'
import type { Component, DeploymentSummary } from '../../../../../store/radix-api'
import {
  aggregateComponentReplicaStatus,
  aggregateComponentStatus,
  aggregateDeploymentStatus,
  EnvironmentStatus as EnvironmentStatusEnum,
} from '../../../../EnvironmentList/environment-status-utils'
import type { StatusPopoverType } from '../../../../status-popover/status-popover'
import type { EnvironmentStatus, EnvironmentStatusElements } from './environmentCardEnvironmentStatus.types'

const STATUS_MAP = {
  Consistent: { icon: check, type: 'default', rank: 0 },
  Running: { icon: check, type: 'default', rank: 1 },
  Starting: { icon: autorenew, type: 'default', rank: 2 },
  Stopped: { icon: stop, type: 'default', rank: 3 },
  Warning: { icon: warning_outlined, type: 'warning', rank: 4 },
  Danger: { icon: error_outlined, type: 'danger', rank: 5 },
} as const satisfies Record<EnvironmentStatus, { icon: IconData; type: StatusPopoverType; rank: number }>

export const getMostSevereStatus = (statuses: EnvironmentStatus[]): EnvironmentStatus =>
  statuses.reduce(
    (mostSevere, status) => (STATUS_MAP[status].rank > STATUS_MAP[mostSevere].rank ? status : mostSevere),
    'Consistent'
  )

export const toEnvironmentStatus = (status: EnvironmentStatusEnum): EnvironmentStatus =>
  EnvironmentStatusEnum[status] as EnvironmentStatus

export const getIconForEnvironmentStatus = (status: EnvironmentStatus): IconData => STATUS_MAP[status].icon

export const getTypeForEnvironmentStatus = (status: EnvironmentStatus): StatusPopoverType => STATUS_MAP[status].type

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
    deployment: toEnvironmentStatus(aggregateDeploymentStatus(deploymentStatus ? [{ status: deploymentStatus }] : [])),
    components: toEnvironmentStatus(aggregateComponentStatus(components)),
    ...(hasReplicas && { replicas: toEnvironmentStatus(aggregateComponentReplicaStatus(components)) }),
  }
}
