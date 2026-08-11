import { github, trending_up } from '@equinor/eds-icons'
import type { BuildSourceView, EnvironmentCardBuildSource, PublicComponent } from './environmentCard.types'

export const MAX_VISIBLE_PUBLIC_COMPONENTS = 2

/**
 * Derives everything the "Source" section renders — label, subtitle, icon and
 * optional link — from a {@link EnvironmentCardBuildSource}.
 */
export const getBuildSourceView = (buildSource: EnvironmentCardBuildSource): BuildSourceView => {
  switch (buildSource.kind) {
    case 'automatic':
      return {
        label: `${buildSource.gitRef}@${buildSource.shortCommitId}`,
        subtitle: `(Built from ${buildSource.branchMapping})`,
        icon: github,
        url: buildSource.commitUrl ? { path: buildSource.commitUrl, showAsExternalUrl: true } : undefined,
      }
    case 'promoted':
      return {
        label: `Promoted from ${buildSource.promotedFrom}`,
        subtitle: buildSource.branchMapping ? `(Built from ${buildSource.branchMapping})` : '(Built manually)',
        icon: trending_up,
        url: buildSource.pipelineJobUrl ? { path: buildSource.pipelineJobUrl, showAsExternalUrl: false } : undefined,
      }
    case 'automatic-not-built-yet':
      return {
        label: 'Will build automatically',
        subtitle: `(Built from ${buildSource.branchMapping})`,
        icon: github,
      }
    case 'promoted-not-built-yet':
      return {
        label: 'Built manually',
        subtitle: '(Built manually)',
        icon: trending_up,
      }
    default:
      return {
        label: 'N/A',
        subtitle: 'N/A',
        icon: undefined,
      }
  }
}

/** Splits public components into a visible slice and a count of those hidden beyond it. */
export const truncatePublicComponents = (
  components: ReadonlyArray<PublicComponent>
): { visible: ReadonlyArray<PublicComponent>; hiddenCount: number } => {
  const visible = components.slice(0, MAX_VISIBLE_PUBLIC_COMPONENTS)
  const hiddenCount = components.length - visible.length

  return {
    visible,
    hiddenCount,
  }
}
