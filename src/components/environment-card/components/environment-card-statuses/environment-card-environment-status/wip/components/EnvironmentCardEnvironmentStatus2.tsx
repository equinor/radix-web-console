import type { Component, Deployment, DeploymentSummary } from '../../../../../../../store/radix-api'
import { getComponentsStatusMeta, getDeploymentStatusMeta, getReplicasStatusMeta } from '../domain/statusMeta.utils'
import { AggregatedStatusPopover } from './aggregated-status-popover/AggregatedStatusPopover'
import type { StatusItem } from './aggregated-status-popover/aggregatedStatusPopover.types'

const EnvironmentCardEnvironmentStatus2 = ({
  latestDeployment,
  components,
}: {
  latestDeployment?: Pick<Deployment | DeploymentSummary, 'status'>
  components?: Component[]
}) => {
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

export default EnvironmentCardEnvironmentStatus2
