import type { Environment, JobSummary } from '../../../../store/radix-api'
import { AggregatedStatusPopover } from '../../../aggregated-status-popover/AggregatedStatusPopover'
import type { StatusItem } from '../../../aggregated-status-popover/aggregatedStatusPopover.types'
import {
  aggregateComponentReplicaStatus,
  aggregateComponentStatus,
  aggregateDeploymentStatus,
  type EnvironmentStatus,
  worstStatus,
} from '../../../environment-card/common/utils'

const aggregateEnvironmentStatus = (environments: Environment[]): EnvironmentStatus => {
  const components = environments.flatMap((env) => env.activeDeployment?.components ?? [])
  const deployments = environments.filter((env) => env.activeDeployment).map((env) => env.activeDeployment!)

  const deploymentStatus = aggregateDeploymentStatus(deployments)
  const componentStatus = aggregateComponentStatus(components)
  const componentReplicaStatus = aggregateComponentReplicaStatus(components)

  return worstStatus(deploymentStatus, componentStatus, componentReplicaStatus)
}

interface ApplicationStatusPopoverProps {
  environments?: Environment[]
  latestJob?: JobSummary
}

export const ApplicationStatusPopover = (props: ApplicationStatusPopoverProps) => {
  const { environments, latestJob } = props

  const latestJobStatus: EnvironmentStatus = latestJob?.status == 'Failed' ? 'Danger' : 'Consistent'
  const environmentsStatus = aggregateEnvironmentStatus(environments ?? [])

  const items: StatusItem[] = [
    { label: 'Latest job', status: latestJobStatus },
    { label: 'Environments', status: environmentsStatus },
  ]

  return <AggregatedStatusPopover title="Application status" items={items} />
}
