import type { IconData } from '@equinor/eds-icons'

export interface BuildSourceView {
  readonly label: string
  readonly subtitle: string
  readonly icon: IconData | undefined
  readonly url?: BuildSourceUrl
}

/** A link rendered for the "Source" section, either external or internal. */
export interface BuildSourceUrl {
  readonly path: string
  readonly showAsExternalUrl: boolean
}

export interface PublicComponent {
  readonly name: string
  readonly url?: string
}

export interface EnvironmentCardActiveDeployment {
  readonly name: string
  readonly activeFrom: string
  readonly url: string
}

export interface EnvironmentCardEnvironment {
  readonly name: string
  readonly url: string
  readonly isOrphan: boolean
}

/**
 * How an environment's active deployment came to be. A union so
 * each case only carries the data it actually needs — the label, subtitle and
 * icon are derived from this by the presentational component.
 */
export type EnvironmentCardBuildSource =
  | EnvironmentCardBuildSourceBuildAndDeploy
  | EnvironmentCardBuildSourcePromoted
  | EnvironmentCardBuildSourceApplyConfig
  | EnvironmentCardBuildSourceDeploy
  | EnvironmentCardBuildSourceNotDeployed
  | EnvironmentCardBuildSourceUnknown

export interface EnvironmentCardBuildSourceBuildAndDeploy {
  readonly pipelineJobType: 'build-deploy'
  readonly branchMapping: string
  readonly gitRef: string
  readonly shortCommitId: string
  readonly commitUrl?: string
}

export interface EnvironmentCardBuildSourceApplyConfig {
  readonly pipelineJobType: 'apply-config'
  readonly pipelineJobUrl?: string
  readonly branchMapping?: string
}

export interface EnvironmentCardBuildSourceDeploy {
  readonly pipelineJobType: 'deploy'
  readonly pipelineJobUrl?: string
}

export interface EnvironmentCardBuildSourceNotDeployed {
  readonly pipelineJobType: undefined
  readonly branchMapping?: string
}

// Deployed, but the deployment lacks the data needed to describe how it was built.
export interface EnvironmentCardBuildSourceUnknown {
  readonly pipelineJobType: 'unknown'
}

export interface EnvironmentCardBuildSourcePromoted {
  readonly pipelineJobType: 'promote'
  readonly promotedFrom: string
  readonly pipelineJobUrl?: string
  readonly branchMapping?: string
}
