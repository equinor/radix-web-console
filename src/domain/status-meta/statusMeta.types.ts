import type { ReactElement } from 'react'
import type {
  AuxiliaryResourceDeployment,
  Component,
  Deployment,
  DeploymentSummary,
  JobSummary,
  ReplicaStatus,
} from '../../store/radix-api'

export type AlertLevel = 'None' | 'Loading' | 'Warning' | 'Danger'

export type StatusMeta = {
  alertLevel: AlertLevel
  priority: number
  icon: ReactElement
}

export type SupportedStatusValues = {
  ComponentStatus: NonNullable<Component['status']>
  AuxiliaryResourceDeploymentStatus: AuxiliaryResourceDeployment['status']
  DeploymentStatus: Deployment['status'] | DeploymentSummary['status']
  ReplicaStatus: ReplicaStatus['status']
  LatestJobStatus: NonNullable<JobSummary['status']>
}
