import { cloud, github, setting_backup_restore, trending_up } from '@equinor/eds-icons'
import type {
  BuildSourceUrl,
  BuildSourceView,
  EnvironmentCardBuildSource,
  PublicComponent,
} from './environmentCard.types'

export const MAX_VISIBLE_PUBLIC_COMPONENTS = 2

/** The subtitle only depends on where the source originates: a branch or a manual trigger. */
const getOriginSubtitle = (branchMapping?: string): string =>
  branchMapping ? `(Built from ${branchMapping})` : '(Deployed manually)'

const getInternalJobUrl = (pipelineJobUrl?: string): BuildSourceUrl | undefined =>
  pipelineJobUrl ? { path: pipelineJobUrl, showAsExternalUrl: false } : undefined

const getLabelForNotDeployed = (branchMapping?: string): string =>
  branchMapping ? 'Will build and deploy automatically' : 'Will be deployed manually'

/**
 * Derives everything the "Source" section renders — label, subtitle, icon and
 * optional link — from a {@link EnvironmentCardBuildSource}.
 */
export const getBuildSourceView = (buildSource: EnvironmentCardBuildSource): BuildSourceView => {
  // No deployment yet
  if (buildSource.pipelineJobType === undefined) {
    return {
      label: getLabelForNotDeployed(buildSource.branchMapping),
      subtitle: getOriginSubtitle(buildSource.branchMapping),
      icon: undefined,
    }
  }

  switch (buildSource.pipelineJobType) {
    // Building and deploying from a branch
    case 'build-deploy':
      return {
        label: `${buildSource.gitRef}@${buildSource.shortCommitId}`,
        subtitle: getOriginSubtitle(buildSource.branchMapping),
        url: buildSource.commitUrl ? { path: buildSource.commitUrl, showAsExternalUrl: true } : undefined,
        icon: github,
      }
    // Manually promoted deployment from another environment
    case 'promote':
      return {
        label: `Promoted from ${buildSource.promotedFrom}`,
        subtitle: getOriginSubtitle(buildSource.branchMapping),
        url: getInternalJobUrl(buildSource.pipelineJobUrl),
        icon: trending_up,
      }
    // Re-deploy from new reading of radixconfig.yaml
    case 'apply-config':
      return {
        label: 'From previous deployment',
        subtitle: getOriginSubtitle(buildSource.branchMapping),
        url: getInternalJobUrl(buildSource.pipelineJobUrl),
        icon: setting_backup_restore,
      }
    // Deployed from a radixconfig override, not an internal radix build
    case 'deploy':
      return {
        label: 'Deployed external image',
        subtitle: '(Deployed manually)',
        url: getInternalJobUrl(buildSource.pipelineJobUrl),
        icon: cloud,
      }
    // 'unknown': deployed, but we lack the data to describe how it was built. Should not happen in practice, but we handle it gracefully.
    default:
      return {
        label: 'N/A',
        subtitle: '(N/A)',
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
