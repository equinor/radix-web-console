import {
  getComponentsStatusMeta,
  getDeploymentStatusMeta,
  getReplicasStatusMeta,
} from '../../../../domain/status-meta/statusMeta.utils'
import type { Component, DeploymentSummary } from '../../../../store/radix-api'
import type { StatusItem } from '../../../status-popover/shared/aggregated-status-popover/aggregatedStatusPopover.types'

/** Aggregates deployment, components and replicas into the popover's status items. */
export const getEnvironmentStatusItems = (
  components: Component[] = [],
  deploymentStatus?: DeploymentSummary['status']
): StatusItem[] => {
  const deployment = getDeploymentStatusMeta({ status: deploymentStatus ?? 'Inactive' })
  const componentsStatus = getComponentsStatusMeta(components)
  const replicasStatus = getReplicasStatusMeta(components)

  return [
    { label: 'Deployment', alertLevel: deployment.alertLevel, icon: deployment.icon },
    { label: 'Components', alertLevel: componentsStatus.alertLevel, icon: componentsStatus.icon },
    { label: 'Replicas', alertLevel: replicasStatus.alertLevel, icon: replicasStatus.icon },
  ]
}
