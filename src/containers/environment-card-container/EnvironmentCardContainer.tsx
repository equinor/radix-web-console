import { EnvironmentCard } from '../../components/environment-card/EnvironmentCard'
import { getEnvironmentReplicaUtilizations } from '../../components/status-popover/shared/utilization-status-popover/utilizationStatusPopover.utils'
import { summarizeEnvironmentVulnerabilities } from '../../components/status-popover/shared/vulnerability-status-popover/vulnerabilityStatusPopover.utils'
import { pollingInterval, slowPollingInterval } from '../../store/defaults'
import {
  type Application,
  type EnvironmentSummary,
  useComponentsQuery,
  useGetApplicationResourcesUtilizationQuery,
} from '../../store/radix-api'
import { useGetEnvironmentVulnerabilitySummaryQuery } from '../../store/scan-api'
import { getEnvironmentCardProps, getEnvironmentStatusItems } from './environmentCardContainer.utils'

export type EnvironmentCardContainerProps = {
  application: Pick<Application, 'name' | 'registration'>
  environment: Pick<EnvironmentSummary, 'name' | 'status' | 'activeDeployment' | 'branchMapping'>
}

export const EnvironmentCardContainer = ({ application, environment }: EnvironmentCardContainerProps) => {
  const deploymentName = environment.activeDeployment?.name

  const { data: components, isLoading: areComponentsLoading } = useComponentsQuery(
    { appName: application.name, deploymentName: deploymentName! },
    { pollingInterval, skip: !deploymentName }
  )

  const { data: envScan, isLoading: isEnvScanLoading } = useGetEnvironmentVulnerabilitySummaryQuery(
    { appName: application.name, envName: environment.name },
    { pollingInterval: 0 }
  )

  const { data: utilization, isLoading: isUtilizationLoading } = useGetApplicationResourcesUtilizationQuery(
    { appName: application.name },
    { pollingInterval: slowPollingInterval }
  )

  const isLoading = areComponentsLoading || isEnvScanLoading || isUtilizationLoading

  const {
    environment: env,
    publicComponents,
    activeDeployment,
    buildSource,
  } = getEnvironmentCardProps(application, environment, components)

  return (
    <EnvironmentCard
      isLoading={isLoading}
      environment={env}
      publicComponents={publicComponents}
      activeDeployment={activeDeployment}
      buildSource={buildSource}
    >
      <EnvironmentCard.Statuses
        replicaUtilizations={getEnvironmentReplicaUtilizations(utilization, environment.name)}
        vulnerabilities={summarizeEnvironmentVulnerabilities(envScan)}
        environmentStatusItems={getEnvironmentStatusItems(components, environment.activeDeployment?.status)}
      />
    </EnvironmentCard>
  )
}
