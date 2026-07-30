import { routes } from '../../router/routes'
import { pollingInterval, slowPollingInterval } from '../../store/defaults'
import {
  type Application,
  type EnvironmentSummary,
  useComponentsQuery,
  useGetApplicationResourcesUtilizationQuery,
} from '../../store/radix-api'
import { useGetEnvironmentVulnerabilitySummaryQuery } from '../../store/scan-api'
import { getAppDeploymentUrl } from '../../utils/routing'
import { routeWithParams, smallGithubCommitHash } from '../../utils/string'
import { EnvironmentCard } from './EnvironmentCard'
import { getBuildSource, getPublicComponents, getPublicComponentsView } from './environmentCard.utils'

export type EnvironmentCardContainerProps = {
  application: Pick<Application, 'name' | 'registration'>
  environment: Pick<EnvironmentSummary, 'name' | 'status' | 'activeDeployment' | 'branchMapping'>
}

export const EnvironmentCardContainer = ({ application, environment }: EnvironmentCardContainerProps) => {
  const { activeDeployment } = environment
  const deploymentName = activeDeployment?.name
  const commitHash = activeDeployment?.gitCommitHash
  const promotedFrom = activeDeployment?.promotedFromEnvironment

  const { data: components, isLoading: areComponentsLoading } = useComponentsQuery(
    { appName: application.name, deploymentName: deploymentName! },
    { pollingInterval, skip: !deploymentName }
  )

  const { data: envScan } = useGetEnvironmentVulnerabilitySummaryQuery(
    { appName: application.name, envName: environment.name },
    { pollingInterval: 0 }
  )

  const { data: utilization } = useGetApplicationResourcesUtilizationQuery(
    { appName: application.name },
    { pollingInterval: slowPollingInterval }
  )

  const pipelineJobUrl = activeDeployment?.createdByJob
    ? routeWithParams(routes.appJob, {
        appName: application.name,
        jobName: activeDeployment?.createdByJob,
      })
    : undefined

  const buildSource = getBuildSource({
    name: activeDeployment?.gitRef,
    branchMapping: environment.branchMapping,
    shortCommitId: commitHash ? smallGithubCommitHash(commitHash) : undefined,
    commitUrl: commitHash ? `${application.registration?.repository}/commit/${commitHash}` : undefined,
    pipelineJobUrl: pipelineJobUrl,
    promotedFrom: promotedFrom,
  })

  const environmentUrl = routeWithParams(routes.appEnvironment, {
    appName: application.name,
    envName: environment.name,
  })

  const isOrphanedEnvironment = environment.status === 'Orphan'

  return (
    <EnvironmentCard
      isLoading={areComponentsLoading}
      environment={{ name: environment.name, url: environmentUrl, isOrphan: isOrphanedEnvironment }}
      publicComponents={getPublicComponentsView(getPublicComponents(components))}
      activeDeployment={
        activeDeployment && deploymentName
          ? {
              name: deploymentName,
              status: activeDeployment.status,
              url: getAppDeploymentUrl(application.name, deploymentName),
              activeFrom: activeDeployment.activeFrom,
            }
          : undefined
      }
      buildSource={buildSource}
      statuses={{ components, envScan, utilization }}
    />
  )
}
