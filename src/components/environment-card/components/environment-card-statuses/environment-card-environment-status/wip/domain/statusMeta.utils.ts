import { check } from '@equinor/eds-icons'
import type {
  Component,
  Deployment,
  DeploymentSummary,
  Environment,
  JobSummary,
} from '../../../../../../../store/radix-api'
import {
  AuxiliaryResourceDeploymentStatusMap,
  ComponentStatusMap,
  DeploymentStatusMap,
  JobStatusMap,
  ReplicaStatusMap,
} from './statusMeta.const'
import type { StatusMeta } from './statusMeta.types'

/** Returns the entry with the highest weight, keeping the first on ties. */
const getHeaviestWeightedStatusMeta = (statuses: StatusMeta[]): StatusMeta => {
  return statuses.reduce<StatusMeta>((worst, current) => (current.weight > worst.weight ? current : worst), {
    alertLevel: 'Good',
    weight: -1,
    icon: check,
  })
}

/**
 * Iterates all components and their replicas, returning the
 * heaviest-weighted status meta for the environment.
 */
export const getReplicasStatusMeta = (components: Component[]): StatusMeta => {
  const replicas = components
    .flatMap((c) => c.replicaList)
    .concat(components?.flatMap((c) => c.oauth2?.deployments?.flatMap((d) => d.replicaList) ?? []))
    .filter((x) => !!x)

  return replicas.reduce<StatusMeta>((agg, { replicaStatus }) => {
    const meta = ReplicaStatusMap[replicaStatus?.status ?? 'Running']
    return getHeaviestWeightedStatusMeta([agg, meta])
  }, ReplicaStatusMap.Running)
}

export const getComponentsStatusMeta = (components: Component[]): StatusMeta => {
  return components.reduce<StatusMeta>((agg, { status, oauth2 }) => {
    const component = ComponentStatusMap[status ?? 'Consistent']
    const auxiliary = AuxiliaryResourceDeploymentStatusMap[oauth2?.deployment.status ?? 'Consistent']

    return getHeaviestWeightedStatusMeta([agg, component, auxiliary])
  }, ComponentStatusMap.Consistent)
}

export const getDeploymentStatusMeta = (deployment: Pick<Deployment | DeploymentSummary, 'status'>): StatusMeta => {
  return DeploymentStatusMap[deployment.status ?? 'Inactive']
}

/** Resolves the StatusMeta for the latest pipeline job, defaulting to a healthy status. */
export const getLatestJobStatusMeta = (latestJob?: Pick<JobSummary, 'status'>): StatusMeta => {
  return JobStatusMap[latestJob?.status ?? 'Succeeded']
}

/**
 * Aggregates every environment's active deployment, components and replicas into the single
 * heaviest-weighted StatusMeta for the application.
 */
export const getEnvironmentsStatusMeta = (environments: Environment[]): StatusMeta => {
  const components = environments.flatMap((environment) => environment.activeDeployment?.components ?? [])
  const deployments = environments
    .map((environment) => environment.activeDeployment)
    .filter((deployment) => !!deployment)

  const deploymentMeta = getHeaviestWeightedStatusMeta(
    deployments.map((deployment) => getDeploymentStatusMeta(deployment))
  )
  const componentsMeta = getComponentsStatusMeta(components)
  const replicasMeta = getReplicasStatusMeta(components)

  return getHeaviestWeightedStatusMeta([deploymentMeta, componentsMeta, replicasMeta])
}
