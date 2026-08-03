import type { IconData } from '@equinor/eds-icons'
import type {
  AuxiliaryResourceDeployment,
  Component,
  Deployment,
  DeploymentSummary,
  JobSummary,
  ReplicaStatus,
} from '../../../../../../../store/radix-api'

export type AlertLevel = 'Warning' | 'Danger' | 'Good'

export type StatusMeta = {
  alertLevel: AlertLevel
  weight: number
  icon: IconData
}

export type SupportedStatusValues = {
  ComponentStatus: NonNullable<Component['status']>
  AuxiliaryResourceDeploymentStatus: AuxiliaryResourceDeployment['status']
  DeploymentStatus: Deployment['status'] | DeploymentSummary['status']
  ReplicaStatus: ReplicaStatus['status']
  LatestJobStatus: NonNullable<JobSummary['status']>
}
