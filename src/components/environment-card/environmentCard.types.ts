import type { IconData } from '@equinor/eds-icons'

export interface BranchInfo {
  readonly name?: string
  readonly shortCommitId?: string
  readonly commitUrl?: string
  /** The branch to automatically build from */
  readonly branchMapping?: string
  readonly promotedFrom?: string
  readonly pipelineJobUrl?: string
}

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

/**
 * How an environment's active deployment came to be. A union so
 * each case only carries the data it actually needs — the label, subtitle and
 * icon are derived from this by the presentational component.
 */
export type EnvironmentCardBuildSource =
  | {
      readonly kind: 'automatic'
      readonly branchMapping: string
      readonly gitRef: string
      readonly shortCommitId: string
      readonly commitUrl?: string
    }
  | {
      readonly kind: 'promoted'
      readonly promotedFrom: string
      /** Present when the environment would otherwise build automatically. */
      readonly branchMapping?: string
      readonly pipelineJobUrl?: string
    }
  | { readonly kind: 'automatic-not-built-yet'; readonly branchMapping: string }
  | { readonly kind: 'promoted-not-built-yet' }
  | { readonly kind: 'unknown' }

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
