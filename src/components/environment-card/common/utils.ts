import { autorenew, check, error_outlined, type IconData, stop, warning_outlined } from '@equinor/eds-icons'
import type {
  Component,
  Deployment,
  DeploymentSummary,
  ReplicaResourcesUtilizationResponse,
  ReplicaUtilization,
} from '../../../store/radix-api'
import type { StatusPopoverType } from '../../status-popover/status-popover'

export type EnvironmentStatus = 'Consistent' | 'Running' | 'Starting' | 'Stopped' | 'Warning' | 'Danger'

/** Walks the nested utilization response once into a flat, path-keyed list. */
export const flattenReplicaUtilization = (
  data: ReplicaResourcesUtilizationResponse | undefined
): Array<{ key: string; replica: ReplicaUtilization }> =>
  Object.entries(data?.environments ?? {}).flatMap(([envName, environment]) =>
    Object.entries(environment.components ?? {}).flatMap(([compName, component]) =>
      Object.entries(component.replicas ?? {}).map(([replicaName, replica]) => ({
        key: `${envName}.${compName}.${replicaName}`,
        replica,
      }))
    )
  )

export const EnvironmentStatusWeightMap: Record<EnvironmentStatus, number> = {
  Consistent: 0,
  Running: 1,
  Starting: 2,
  Stopped: 3,
  Warning: 4,
  Danger: 5,
}

const ComponentStatusMap: Record<string, EnvironmentStatus> = {
  Stopped: 'Stopped',
  Consistent: 'Consistent',
}

const AuxiliaryResourceDeploymentStatusMap: Record<string, EnvironmentStatus> = {
  Stopped: 'Stopped',
  Consistent: 'Consistent',
}

const ReplicaStatusMap: Record<string, EnvironmentStatus> = {
  Running: 'Running',
  Starting: 'Starting',
}

type DeploymentStatus = Required<Deployment | DeploymentSummary>['status']

const DeploymentStatusMap = {
  Reconciling: 'Consistent',
  Failed: 'Danger',
  Inactive: 'Consistent',
  Ready: 'Consistent',
} satisfies Record<DeploymentStatus, EnvironmentStatus>

/** Returns the status with the highest severity weight. */
export function worstStatus(...statuses: EnvironmentStatus[]): EnvironmentStatus {
  return statuses.reduce<EnvironmentStatus>(
    (worst, status) => (EnvironmentStatusWeightMap[status] > EnvironmentStatusWeightMap[worst] ? status : worst),
    'Consistent'
  )
}

export function aggregateDeploymentStatus(
  deployments: Pick<Deployment | DeploymentSummary, 'status'>[]
): EnvironmentStatus {
  return deployments.reduce<EnvironmentStatus>((agg, deployment) => {
    const currentStatus = deployment.status ? DeploymentStatusMap[deployment.status] : 'Consistent'
    return worstStatus(agg, currentStatus)
  }, 'Consistent')
}

export function aggregateComponentStatus(components: Component[]): EnvironmentStatus {
  return components.reduce<EnvironmentStatus>((agg, { status, oauth2 }) => {
    const compStatus = status ?? 'unknown'
    const oauth2Status = oauth2?.deployment.status ?? 'Consistent'
    return worstStatus(
      agg,
      ComponentStatusMap[compStatus] ?? 'Warning',
      AuxiliaryResourceDeploymentStatusMap[oauth2Status] ?? 'Warning'
    )
  }, 'Consistent')
}

export function aggregateComponentReplicaStatus(components: Component[]): EnvironmentStatus {
  const replicas = components
    .flatMap((c) => c.replicaList)
    .concat(components?.flatMap((c) => c.oauth2?.deployment.replicaList ?? []))
    .filter((x) => !!x)

  return replicas.reduce<EnvironmentStatus>((agg, { replicaStatus }) => {
    const status = replicaStatus?.status ?? 'Pending'
    return worstStatus(agg, ReplicaStatusMap[status] ?? 'Warning')
  }, 'Consistent')
}

// export function aggregateVulnerabilitySummaries(summaries: VulnerabilitySummary[]): VulnerabilitySummary {
//   return summaries
//     .filter((x) => !!x)
//     .reduce((o1, x) => Object.keys(x).reduce((o2, xKey) => ({ ...o2, [xKey]: x[xKey] + (o2[xKey] ?? 0) }), o1), {})
// }

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

export const getIconForEnvironmentStatus = (status: EnvironmentStatus): IconData => STATUS_MAP[status].icon

export const getTypeForEnvironmentStatus = (status: EnvironmentStatus): StatusPopoverType => STATUS_MAP[status].type
