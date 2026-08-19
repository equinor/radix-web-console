import type {
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

// Deployed, but a plain 'build' or missing data means we can't describe how it was built.
const UNKNOWN_BUILD_SOURCE: EnvironmentCardBuildSource = { pipelineJobType: 'unknown' }

// A build-deploy is defined by its branch and commit; without them there is nothing to describe.
const getBuildDeploySource = (
  deployment: DeploymentSummary,
  branchMapping: string | undefined,
  repository: string | undefined
): EnvironmentCardBuildSource => {
  const { gitRef, gitCommitHash } = deployment
  if (!branchMapping || !gitRef || !gitCommitHash) {
    return UNKNOWN_BUILD_SOURCE
  }

  return {
    pipelineJobType: 'build-deploy',
    branchMapping,
    gitRef,
    shortCommitId: smallGithubCommitHash(gitCommitHash),
    commitUrl: repository ? `${repository}/commit/${gitCommitHash}` : undefined,
  }
}

const getPromotedSource = (
  deployment: DeploymentSummary,
  branchMapping: string | undefined,
  pipelineJobUrl: string | undefined
): EnvironmentCardBuildSource =>
  deployment.promotedFromEnvironment
    ? { pipelineJobType: 'promote', promotedFrom: deployment.promotedFromEnvironment, pipelineJobUrl, branchMapping }
    : UNKNOWN_BUILD_SOURCE

const getCardBuildSource = (
  application: Pick<Application, 'name' | 'registration'>,
  environment: Pick<EnvironmentSummary, 'activeDeployment' | 'branchMapping'>
): EnvironmentCardBuildSource => {
  const { activeDeployment, branchMapping } = environment

  // No active deployment: it will build from a branch or be deployed manually.
  if (!activeDeployment?.name) {
    return { pipelineJobType: undefined, branchMapping }
  }

  const pipelineJobUrl = activeDeployment.createdByJob
    ? routeWithParams(routes.appJob, { appName: application.name, jobName: activeDeployment.createdByJob })
    : undefined

  switch (activeDeployment.pipelineJobType) {
    case 'build-deploy':
      return getBuildDeploySource(activeDeployment, branchMapping, application.registration?.repository)

    case 'promote':
      return getPromotedSource(activeDeployment, branchMapping, pipelineJobUrl)

    case 'apply-config':
      return { pipelineJobType: 'apply-config', pipelineJobUrl, branchMapping }

    case 'deploy':
      return { pipelineJobType: 'deploy', pipelineJobUrl }

    default:
      return UNKNOWN_BUILD_SOURCE
  }
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
