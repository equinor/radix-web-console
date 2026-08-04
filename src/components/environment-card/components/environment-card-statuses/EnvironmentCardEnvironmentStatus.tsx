import type { Component, Deployment, DeploymentSummary } from '../../../../store/radix-api'
import { AggregatedStatusPopover } from '../../../status-popover/shared/aggregated-status-popover/AggregatedStatusPopover'
import type { StatusItem } from '../../../status-popover/shared/aggregated-status-popover/aggregatedStatusPopover.types'
import {
  getComponentsStatusMeta,
  getDeploymentStatusMeta,
  getReplicasStatusMeta,
} from './environment-card-environment-status/wip/domain/statusMeta.utils'

interface EnvironmentCardEnvironmentStatusProps {
  latestDeployment?: Pick<Deployment | DeploymentSummary, 'status'>
  components?: Component[]
}

const EnvironmentCardEnvironmentStatus = ({ latestDeployment, components }: EnvironmentCardEnvironmentStatusProps) => {
  const replicasStatus = getReplicasStatusMeta(components ?? [])
  const componentsStatus = getComponentsStatusMeta(components ?? [])
  const deploymentStatus = getDeploymentStatusMeta(latestDeployment ?? { status: 'Inactive' })

  const items: StatusItem[] = [
    { label: 'Deployment', alertLevel: deploymentStatus.alertLevel, icon: deploymentStatus.icon },
    { label: 'Components', alertLevel: componentsStatus.alertLevel, icon: componentsStatus.icon },
    { label: 'Replicas', alertLevel: replicasStatus.alertLevel, icon: replicasStatus.icon },
  ]

  return <AggregatedStatusPopover title="Environment Status" items={items} />
}

export default EnvironmentCardEnvironmentStatus
