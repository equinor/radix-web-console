import type { ReactElement } from 'react'
import type {
  AuxiliaryResourceDeployment,
  Component,
  Deployment,
  DeploymentSummary,
  JobSummary,
  ReplicaStatus,
} from '../../../../../../../store/radix-api'

export type AlertLevel = 'None' | 'Warning' | 'Danger'

export type StatusMeta = {
  alertLevel: AlertLevel
  weight: number
  icon: ReactElement
}

export type SupportedStatusValues = {
  ComponentStatus: NonNullable<Component['status']>
  AuxiliaryResourceDeploymentStatus: AuxiliaryResourceDeployment['status']
  DeploymentStatus: Deployment['status'] | DeploymentSummary['status']
  ReplicaStatus: ReplicaStatus['status']
  LatestJobStatus: NonNullable<JobSummary['status']>
}
