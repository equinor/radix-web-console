import { Icon } from '@equinor/eds-core-react'
import { check, error_outlined, type IconData, warning_outlined } from '@equinor/eds-icons'
import type { ReactNode } from 'react'
import type {
  AuxiliaryResourceDeployment,
  Component,
  Deployment,
  DeploymentSummary,
} from '../../../../../store/radix-api'
import { StatusBadgeTemplate } from '../../../../status-badges/status-badge-template'
import { StatusPopover } from '../../../../status-popover/status-popover'

const EnvironmentCardEnvironmentStatus2 = ({
  latestDeployment,
  components,
}: {
  latestDeployment?: {
    status: Deployment['status'] | DeploymentSummary['status']
  }
  components?: Component[]
}) => {
  const replicaSummary = summarizeReplicas(components ?? [])
  const componentSummary = summarizeComponents(components ?? [])
  const deploymentSummary = summarizeDeployment(latestDeployment ?? { status: 'Inactive' })

  const items: { label: string; status: Status; originalValue: string }[] = [
    { label: 'Deployment', status: deploymentSummary.status, originalValue: deploymentSummary.originalValue },
    { label: 'Components', status: componentSummary.status, originalValue: componentSummary.originalValue },
    { label: 'Replicas', status: replicaSummary.status, originalValue: replicaSummary.originalValue },
  ]

  return <AggregatedStatusPopover title="Environment Status" items={items} />
}

export default EnvironmentCardEnvironmentStatus2

export type Status = 'Warning' | 'Danger' | 'Good'

const StatusWeightMap: Record<Status, number> = {
  Good: 0,
  Warning: 1,
  Danger: 2,
}
const ReplicaStatusMap: Record<string, Status> = {
  Running: 'Good',
  Pending: 'Warning',
  Failed: 'Danger',
  Unknown: 'Warning',
}

const ComponentStatusMap: Record<Exclude<Component['status'], undefined>, Status> = {
  Stopped: 'Good',
  Consistent: 'Good',
  Reconciling: 'Warning',
  Restarting: 'Warning',
  Outdated: 'Warning',
}

const AuxiliaryResourceDeploymentStatusMap: Record<AuxiliaryResourceDeployment['status'], Status> = {
  Stopped: 'Good',
  Consistent: 'Good',
  Reconciling: 'Warning',
}

const DeploymentStatusMap: Record<Deployment['status'] | DeploymentSummary['status'], Status> = {
  Reconciling: 'Warning',
  Failed: 'Danger',
  Inactive: 'Good',
  Ready: 'Good',
}

type StatusWithOriginalValue = {
  status: Status
  originalValue: string
}
/** Returns the status with the highest severity weight. */
export function worstStatus(statuses: StatusWithOriginalValue[]): StatusWithOriginalValue {
  return statuses.reduce<StatusWithOriginalValue>(
    (worst, status) => {
      return StatusWeightMap[status.status] > StatusWeightMap[worst.status]
        ? { status: status.status, originalValue: status.originalValue }
        : worst
    },
    { status: 'Good', originalValue: '' } // Dunno bout this
  )
}

const summarizeReplicas = (components: Component[]): StatusWithOriginalValue => {
  const replicas = components
    .flatMap((c) => c.replicaList)
    // TODO: Should check oauth2 deployments, not deployment
    .concat(components?.flatMap((c) => c.oauth2?.deployment.replicaList ?? []))
    .filter((x) => !!x)

  return replicas.reduce<StatusWithOriginalValue>(
    (agg, { replicaStatus }) => {
      const originalValue = replicaStatus?.status ?? 'Running'
      const status = ReplicaStatusMap[originalValue] ?? 'Warning'

      const worst = worstStatus([agg, { status, originalValue: originalValue }])
      return worst
    },
    { status: 'Good', originalValue: 'Running' }
  )
}

const summarizeComponents = (components: Component[]): StatusWithOriginalValue => {
  return components.reduce<StatusWithOriginalValue>(
    (agg, { status, oauth2 }) => {
      const compStatus = status ?? 'Consistent'
      const oauth2Status = oauth2?.deployment.status ?? 'Consistent'

      const worst = worstStatus([
        agg,
        { status: ComponentStatusMap[compStatus] ?? 'Warning', originalValue: compStatus },
        { status: AuxiliaryResourceDeploymentStatusMap[oauth2Status] ?? 'Warning', originalValue: oauth2Status },
      ])
      return worst
    },
    { status: 'Good', originalValue: 'Running' }
  )
}

const summarizeDeployment = (deployment: Pick<Deployment | DeploymentSummary, 'status'>): StatusWithOriginalValue => {
  return deployment.status
    ? { status: DeploymentStatusMap[deployment.status] ?? 'Warning', originalValue: deployment.status }
    : { status: 'Good', originalValue: 'Inactive' } // Dunno bout this
}

interface StatusItem {
  label: string
  status: Status
  originalValue: string
}
interface AggregatedStatusPopoverProps {
  title: ReactNode
  items: StatusItem[]
}

export const AggregatedStatusPopover = (props: AggregatedStatusPopoverProps) => {
  const { title, items } = props

  if (items.length === 0) {
    return null
  }
  console.log('AggregatedStatusPopover items:', items) // Log the items for debugging

  const aggregatedStatus = getMostSevereStatus(items.map((item) => item.status))

  return (
    <StatusPopover
      title={title}
      type={getTypeForEnvironmentStatus(aggregatedStatus)}
      icon={<Icon data={getIconForEnvironmentStatus(aggregatedStatus)} />}
    >
      <div className="grid grid--gap-small">
        <p>custom</p>
        {items.map((item) => (
          <StatusBadgeTemplate
            key={item.label}
            type={getTypeForEnvironmentStatus(item.status)}
            icon={<Icon data={getIconForEnvironmentStatus(item.status)} />}
          >
            {item.label}
          </StatusBadgeTemplate>
        ))}
      </div>
    </StatusPopover>
  )
}

const getMostSevereStatus = (statuses: Status[]): Status => {
  return statuses.reduce(
    (mostSevere, status) => (StatusWeightMap[status] > StatusWeightMap[mostSevere] ? status : mostSevere),
    'Good'
  )
}

const getTypeForEnvironmentStatus = (status: Status): 'default' | 'warning' | 'danger' => {
  switch (status) {
    case 'Good':
      return 'default'
    case 'Warning':
      return 'warning'
    case 'Danger':
      return 'danger'
    default:
      return 'default'
  }
}

const getIconForEnvironmentStatus = (status: Status): IconData => {
  switch (status) {
    case 'Good':
      return check
    case 'Warning':
      return warning_outlined
    case 'Danger':
      return error_outlined
    default:
      return check
  }
}
