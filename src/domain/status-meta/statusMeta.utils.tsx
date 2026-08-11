import type {
  AuxiliaryResourceDeployment,
  Component,
  Deployment,
  DeploymentSummary,
  Environment,
  JobSummary,
} from '../../store/radix-api'
import {
  ALERT_LEVEL_SEVERITY_MAP,
  AUXILIARY_RESOURCE_DEPLOYMENT_STATUS_MAP,
  COMPONENT_STATUS_MAP,
  DEPLOYMENT_STATUS_MAP,
  JOB_STATUS_MAP,
  NONE_STATUS_META,
  REPLICA_STATUS_MAP,
  UNKNOWN_STATUS_META,
} from './statusMeta.const'
import type { AlertLevel, StatusMeta } from './statusMeta.types'

/** Collapses statuses into the most severe by alert level, ties are broken by the one with the highest priority. */
const getMostSevereStatusMeta = (statuses: StatusMeta[]): StatusMeta =>
  statuses.reduce<StatusMeta>((worst, current) => {
    const severityDiff = ALERT_LEVEL_SEVERITY_MAP[current.alertLevel] - ALERT_LEVEL_SEVERITY_MAP[worst.alertLevel]

    if (severityDiff === 0) {
      return current.priority > worst.priority ? current : worst
    }

    return severityDiff > 0 ? current : worst
  }, NONE_STATUS_META)

/**
 * Resolves a status to its meta, falling back to {@link UNKNOWN_STATUS_META} when the value is
 * missing or not one the map knows about (e.g. unexpected data from the backend).
 */
const resolveStatusMeta = <TStatus extends string>(
  map: Record<TStatus, StatusMeta>,
  status: TStatus | undefined
): StatusMeta => {
  const meta = map[status as TStatus]

  // A defined-but-unmapped status means the backend sent a value we don't know about.
  if (status !== undefined && meta === undefined) {
    console.warn(`resolveStatusMeta: unknown status "${status}"`)
  }

  return meta ?? UNKNOWN_STATUS_META
}

/**
 * Iterates all components and their replicas, returning the most severe
 * status meta for the environment.
 */
export const getReplicasStatusMeta = (components: Component[]): StatusMeta => {
  const replicas = components
    .flatMap((c) => c.replicaList)
    .concat(components?.flatMap((c) => c.oauth2?.deployments?.flatMap((d) => d.replicaList) ?? []))
    .filter((x) => !!x)

  return replicas.reduce<StatusMeta>((agg, { replicaStatus }) => {
    const meta = resolveStatusMeta(REPLICA_STATUS_MAP, replicaStatus?.status)
    return getMostSevereStatusMeta([agg, meta])
  }, REPLICA_STATUS_MAP.Running)
}

const getOauth2DeploymentStatusMeta = (oauth2Deployments: AuxiliaryResourceDeployment[]): StatusMeta =>
  oauth2Deployments.reduce<StatusMeta>((agg, deployment) => {
    const meta = resolveStatusMeta(AUXILIARY_RESOURCE_DEPLOYMENT_STATUS_MAP, deployment.status)
    return getMostSevereStatusMeta([agg, meta])
  }, AUXILIARY_RESOURCE_DEPLOYMENT_STATUS_MAP.Consistent)

export const getComponentsStatusMeta = (components: Component[]): StatusMeta =>
  components.reduce<StatusMeta>((agg, component) => {
    const componentStatus = resolveStatusMeta(COMPONENT_STATUS_MAP, component.status)
    const oauth2DeploymentStatus = getOauth2DeploymentStatusMeta(component.oauth2?.deployments ?? [])

    return getMostSevereStatusMeta([agg, componentStatus, oauth2DeploymentStatus])
  }, COMPONENT_STATUS_MAP.Consistent)

export const getDeploymentStatusMeta = (deployment: {
  status?: Deployment['status'] | DeploymentSummary['status']
}): StatusMeta => resolveStatusMeta(DEPLOYMENT_STATUS_MAP, deployment.status ?? 'Ready')

/** Resolves the StatusMeta for the latest pipeline job, or unknown when it is missing. */
export const getLatestJobStatusMeta = (latestJob?: Pick<JobSummary, 'status'>): StatusMeta =>
  resolveStatusMeta(JOB_STATUS_MAP, latestJob?.status)

/**
 * Aggregates every environment's active deployment, components and replicas into the single
 * most severe StatusMeta for the application.
 */
export const getEnvironmentsStatusMeta = (
  environments: ReadonlyArray<Pick<Environment, 'activeDeployment'>>
): StatusMeta => {
  const components = environments.flatMap((environment) => environment.activeDeployment?.components ?? [])
  const deployments = environments
    .map((environment) => environment.activeDeployment)
    .filter((deployment) => !!deployment)

  const deploymentMeta = getMostSevereStatusMeta(deployments.map((deployment) => getDeploymentStatusMeta(deployment)))
  const componentsMeta = getComponentsStatusMeta(components)
  const replicasMeta = getReplicasStatusMeta(components)

  return getMostSevereStatusMeta([deploymentMeta, componentsMeta, replicasMeta])
}
