import { github, trending_up } from '@equinor/eds-icons'
import type { Component } from '../../store/radix-api'
import type {
  BranchInfo,
  EnvironmentCardBuildSource,
  EnvironmentCardPublicComponent,
  PublicComponentsView,
} from './environmentCard.types'

/** Component environment variable that, when present, exposes a public URL. */
export const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME'

export const MAX_VISIBLE_PUBLIC_COMPONENTS = 2

/**
 * Derives the publicly reachable components from raw component data by keeping
 * only those exposing a public URL through the {@link URL_VAR_NAME} variable.
 */
export const getPublicComponents = (components: ReadonlyArray<Component> = []): EnvironmentCardPublicComponent[] =>
  components
    .filter((component) => component.variables?.[URL_VAR_NAME])
    .map((component) => ({
      name: component.name,
      url: component.variables?.[URL_VAR_NAME] ?? '',
    }))

/**
 * Derives how the "Source" section of an environment card should be presented
 * from the (possibly regex) branch mapping and the active deployment info.
 */
export const getBuildSource = (branch: BranchInfo): EnvironmentCardBuildSource => {
  const { name, shortCommitId, commitUrl, branchMapping, promotedFrom, pipelineJobUrl } = branch

  // Promoted deployments show where they were promoted from and link to the pipeline job.
  if (promotedFrom) {
    return {
      // With a branch mapping the environment would normally build automatically,
      // but this specific deployment was promoted instead.
      type: branchMapping ? 'automatic-but-promoted' : 'promote',
      subtitle: branchMapping ? `(Built from ${branchMapping})` : '(Built manually)',
      label: `Promoted from ${promotedFrom}`,
      url: pipelineJobUrl ? { path: pipelineJobUrl, showAsExternalUrl: false } : undefined,
      icon: trending_up,
    }
  }

  // Automatically built from a branch mapping.
  if (branchMapping && name && shortCommitId) {
    return {
      type: 'automatic',
      subtitle: `(Built from ${branchMapping})`,
      label: `${name}@${shortCommitId}`,
      url: commitUrl ? { path: commitUrl, showAsExternalUrl: true } : undefined,
      icon: github,
    }
  }

  // Branch mapping exists but nothing has been built yet.
  if (branchMapping && !name && !shortCommitId) {
    return {
      type: 'not-built-yet',
      subtitle: `(Built from ${branchMapping})`,
      label: 'Will build automatically',
      icon: github,
    }
  }

  // No branch mapping and not promoted — deployed manually.
  if (!branchMapping) {
    return {
      type: 'promote',
      subtitle: '(Built manually)',
      label: 'Built manually',
      icon: trending_up,
    }
  }

  // Fallback: Not available.
  return {
    type: 'unknown',
    subtitle: 'N/A',
    label: 'N/A',
    icon: undefined,
  }
}

/**
 * Splits public components into a visible slice and a hidden count, providing a
 * ready to render "(+N more)" subtitle when some are collapsed.
 */
export const getPublicComponentsView = (
  components: ReadonlyArray<EnvironmentCardPublicComponent> = [],
  max: number = MAX_VISIBLE_PUBLIC_COMPONENTS
): PublicComponentsView => {
  const visible = components.slice(0, max)
  const hiddenCount = components.length - visible.length

  return {
    visible,
    hiddenCount,
    subtitle: hiddenCount > 0 ? `(+${hiddenCount} more)` : undefined,
  }
}
