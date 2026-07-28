import type { IconData } from '@equinor/eds-icons'

export type BuildSourceType = 'automatic' | 'automatic-but-promoted' | 'not-built-yet' | 'promote' | 'unknown'

export interface BranchInfo {
  readonly name?: string
  readonly shortCommitId?: string
  readonly commitUrl?: string
  /** The branch to build from defined in radixconfig */
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

export interface EnvironmentCardPublicComponent {
  readonly name: string
  readonly url: string
}

export interface PublicComponentsView {
  readonly visible: ReadonlyArray<EnvironmentCardPublicComponent>
  readonly hiddenCount: number
  readonly subtitle?: string
}
