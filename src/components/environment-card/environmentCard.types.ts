import type { IconData } from '@equinor/eds-icons'
import type { Component, DeploymentSummary, ReplicaResourcesUtilizationResponse } from '../../store/radix-api'
import type { EnvironmentVulnerabilities } from '../../store/scan-api'

export type BuildSourceType = 'automatic' | 'automatic-but-promoted' | 'not-built-yet' | 'promote' | 'unknown'

export interface BranchInfo {
  readonly name?: string
  readonly shortCommitId?: string
  readonly commitUrl?: string
  /** The branch to automatically build from */
  readonly branchMapping?: string
  readonly promotedFrom: string | undefined
  readonly pipelineJobUrl?: string
}

export interface EnvironmentCardBuildSource {
  readonly type: BuildSourceType
  /** Human readable subtitle wrapped in parenthesis, e.g. "(Built from branch main)". */
  readonly subtitle: string
  /** Text to render in the section body. */
  readonly label: string
  /** When set the label should be rendered as a link. */
  readonly url?: {
    path: string
    showAsExternalUrl: boolean
  }
  readonly icon: IconData | undefined
}

export interface PublicComponent {
  readonly name: string
  readonly url: string
}

export interface PublicComponentsView {
  readonly visible: ReadonlyArray<PublicComponent>
  readonly hiddenCount: number
  readonly subtitle?: string
}

export interface EnvironmentCardEnvironment {
  readonly name: string
  readonly url: string
}

export interface EnvironmentCardPublicComponents {
  readonly visible: ReadonlyArray<PublicComponent>
  readonly subtitle?: string
}

export interface EnvironmentCardActiveDeployment {
  readonly name: string
  readonly activeFrom: string
  readonly status: DeploymentSummary['status']
  readonly url: string
}

export interface EnvironmentCardStatusData {
  readonly components?: Component[]
  readonly envScan?: EnvironmentVulnerabilities
  readonly utilization?: ReplicaResourcesUtilizationResponse
}
