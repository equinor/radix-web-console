import type {
  BranchInfo,
  EnvironmentCardActiveDeployment,
  EnvironmentCardBuildSource,
  EnvironmentCardEnvironment,
  PublicComponent,
} from '../../components/environment-card/environmentCard.types'
import type { StatusItem } from '../../components/status-popover/shared/aggregated-status-popover/aggregatedStatusPopover.types'
import {
  getComponentsStatusMeta,
  getDeploymentStatusMeta,
  getReplicasStatusMeta,
} from '../../domain/status-meta/statusMeta.utils'
import { routes } from '../../router/routes'
import type { Application, Component, DeploymentSummary, EnvironmentSummary } from '../../store/radix-api'
import { getAppDeploymentUrl } from '../../utils/routing'
import { routeWithParams, smallGithubCommitHash } from '../../utils/string'

/** Component environment variable that, when present, exposes a public URL. */
export const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME'

const getPublicComponentUrl = (component: Component) => {
  return component.variables?.[URL_VAR_NAME] ? `https://${component.variables[URL_VAR_NAME]}` : undefined
}

/**
 * Derives the publicly reachable components from raw component data by keeping
 * only those exposing a public URL through the {@link URL_VAR_NAME} variable.
 */
export const getPublicComponents = (components: ReadonlyArray<Component> = []): PublicComponent[] =>
  components
    .filter((component) => component.variables?.[URL_VAR_NAME])
    .map((component) => ({
      name: component.name,
      url: getPublicComponentUrl(component),
    }))

/**
 * Derives how the "Source" section of an environment card should be presented
 * from the (possibly regex) branch mapping and the active deployment info.
 */
export const getBuildSource = (branch: BranchInfo): EnvironmentCardBuildSource => {
  const { gitRef, shortCommitId, commitUrl, branchMapping, promotedFrom, pipelineJobType, pipelineJobUrl } = branch

  // Promoted deployments show where they were promoted from and link to the pipeline job.
  if (pipelineJobType === 'promote' && promotedFrom) {
    return {
      kind: 'promoted',
      promotedFrom,
      branchMapping,
      pipelineJobUrl,
    }
  }

  // Automatically built from a branch mapping.
  if (pipelineJobType === 'build-deploy' && gitRef && shortCommitId) {
    return {
      kind: 'build-deployed',
      branchMapping,
      gitRef,
      shortCommitId,
      commitUrl,
    }
  }

  // Manually deployed deployments show the link to the pipeline job.
  if (pipelineJobType === 'deploy') {
    return {
      kind: 'deployed',
      branchMapping,
      pipelineJobUrl,
    }
  }

  // Branch mapping exists but nothing has been built yet.
  if (branchMapping) {
    return {
      kind: 'automatic-not-deployed-yet',
      branchMapping,
    }
  }

  return { kind: 'manual-not-deployed-yet' }
}

const getCardEnvironment = (
  application: Pick<Application, 'name'>,
  environment: Pick<EnvironmentSummary, 'name' | 'status'>
): EnvironmentCardEnvironment => ({
  name: environment.name,
  url: routeWithParams(routes.appEnvironment, { appName: application.name, envName: environment.name }),
  isOrphan: environment.status === 'Orphan',
})

const getCardActiveDeployment = (
  appName: string,
  activeDeployment: EnvironmentSummary['activeDeployment']
): EnvironmentCardActiveDeployment | undefined => {
  if (!activeDeployment?.name) {
    return undefined
  }

  return {
    name: activeDeployment.name,
    url: getAppDeploymentUrl(appName, activeDeployment.name),
    activeFrom: activeDeployment.activeFrom,
  }
}

const getCardBuildSource = (
  application: Pick<Application, 'name' | 'registration'>,
  environment: Pick<EnvironmentSummary, 'activeDeployment' | 'branchMapping'>
): EnvironmentCardBuildSource => {
  const { activeDeployment, branchMapping } = environment
  const commitHash = activeDeployment?.gitCommitHash

  const pipelineJobUrl = activeDeployment?.createdByJob
    ? routeWithParams(routes.appJob, { appName: application.name, jobName: activeDeployment.createdByJob })
    : undefined

  return getBuildSource({
    gitRef: activeDeployment?.gitRef,
    branchMapping,
    shortCommitId: commitHash ? smallGithubCommitHash(commitHash) : undefined,
    commitUrl: commitHash ? `${application.registration?.repository}/commit/${commitHash}` : undefined,
    pipelineJobUrl,
    pipelineJobType: activeDeployment?.pipelineJobType,
    promotedFrom: activeDeployment?.promotedFromEnvironment,
  })
}

/**
 * Derives the props the presentational EnvironmentCard renders from raw domain
 * data (application, environment and its components).
 */
export const getEnvironmentCardProps = (
  application: Pick<Application, 'name' | 'registration'>,
  environment: Pick<EnvironmentSummary, 'name' | 'status' | 'activeDeployment' | 'branchMapping'>,
  components?: Component[]
): {
  environment: EnvironmentCardEnvironment
  publicComponents: ReadonlyArray<PublicComponent>
  activeDeployment?: EnvironmentCardActiveDeployment
  buildSource: EnvironmentCardBuildSource
} => ({
  environment: getCardEnvironment(application, environment),
  publicComponents: getPublicComponents(components),
  activeDeployment: getCardActiveDeployment(application.name, environment.activeDeployment),
  buildSource: getCardBuildSource(application, environment),
})

/** Aggregates deployment, components and replicas into the popover's status items. */
export const getEnvironmentStatusItems = (
  components: Component[] = [],
  deploymentStatus?: DeploymentSummary['status']
): StatusItem[] => {
  const deployment = getDeploymentStatusMeta({ status: deploymentStatus })
  const componentsStatus = getComponentsStatusMeta(components)
  const replicasStatus = getReplicasStatusMeta(components)

  return [
    { label: 'Deployment', alertLevel: deployment.alertLevel, icon: deployment.icon },
    { label: 'Components', alertLevel: componentsStatus.alertLevel, icon: componentsStatus.icon },
    { label: 'Replicas', alertLevel: replicasStatus.alertLevel, icon: replicasStatus.icon },
  ]
}
