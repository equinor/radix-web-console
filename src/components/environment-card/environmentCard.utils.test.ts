import { cloud, github, setting_backup_restore, trending_up } from '@equinor/eds-icons'
import { describe, expect, it } from 'vitest'
import type { PublicComponent } from './environmentCard.types'
import { getBuildSourceView, MAX_VISIBLE_PUBLIC_COMPONENTS, truncatePublicComponents } from './environmentCard.utils'

describe('getBuildSourceView', () => {
  it('shows the git ref, commit and an external commit link for a build-deploy', () => {
    const view = getBuildSourceView({
      pipelineJobType: 'build-deploy',
      branchMapping: 'main',
      gitRef: 'main',
      shortCommitId: 'abc123',
      commitUrl: 'https://repo/commit/abc123',
    })

    expect(view).toEqual({
      label: 'main@abc123',
      subtitle: '(Built from main)',
      icon: github,
      url: { path: 'https://repo/commit/abc123', showAsExternalUrl: true },
    })
  })

  it('omits the url for a build-deploy without a commit url', () => {
    const view = getBuildSourceView({
      pipelineJobType: 'build-deploy',
      branchMapping: 'main',
      gitRef: 'main',
      shortCommitId: 'abc123',
    })

    expect(view.url).toBeUndefined()
  })

  it('shows where a promoted deployment was promoted from with an internal job link', () => {
    const view = getBuildSourceView({
      pipelineJobType: 'promote',
      branchMapping: 'main',
      promotedFrom: 'qa',
      pipelineJobUrl: '/job/123',
    })

    expect(view).toEqual({
      label: 'Promoted from qa',
      subtitle: '(Built from main)',
      icon: trending_up,
      url: { path: '/job/123', showAsExternalUrl: false },
    })
  })

  it('treats a promoted deployment without a branch mapping as deployed manually in the subtitle', () => {
    const view = getBuildSourceView({ pipelineJobType: 'promote', promotedFrom: 'qa' })

    expect(view.subtitle).toBe('(Deployed manually)')
    expect(view.url).toBeUndefined()
  })

  it('describes an apply-config re-deployment with an internal job link', () => {
    expect(
      getBuildSourceView({ pipelineJobType: 'apply-config', branchMapping: 'main', pipelineJobUrl: '/job/456' })
    ).toEqual({
      label: 'From previous deployment',
      subtitle: '(Built from main)',
      icon: setting_backup_restore,
      url: { path: '/job/456', showAsExternalUrl: false },
    })
  })

  it('uses a manual subtitle for an apply-config without a branch mapping', () => {
    const view = getBuildSourceView({ pipelineJobType: 'apply-config', pipelineJobUrl: '/job/456' })

    expect(view.subtitle).toBe('(Deployed manually)')
  })

  it('describes an externally deployed image as deployed manually', () => {
    expect(getBuildSourceView({ pipelineJobType: 'deploy', pipelineJobUrl: '/job/789' })).toEqual({
      label: 'Deployed external image',
      subtitle: '(Deployed manually)',
      icon: cloud,
      url: { path: '/job/789', showAsExternalUrl: false },
    })
  })

  it('omits the url for an externally deployed image without a job link', () => {
    const view = getBuildSourceView({ pipelineJobType: 'deploy' })

    expect(view.url).toBeUndefined()
  })

  it('shows an automatic placeholder for a branch mapping with no deployment yet', () => {
    expect(getBuildSourceView({ pipelineJobType: undefined, branchMapping: 'main' })).toEqual({
      label: 'Will build and deploy automatically',
      subtitle: '(Built from main)',
      icon: undefined,
    })
  })

  it('shows a manual placeholder when there is no deployment and no branch mapping', () => {
    expect(getBuildSourceView({ pipelineJobType: undefined })).toEqual({
      label: 'To be deployed manually',
      subtitle: '(Deployed manually)',
      icon: undefined,
    })
  })

  it('falls back to N/A for an unknown build source', () => {
    expect(getBuildSourceView({ pipelineJobType: 'unknown' })).toEqual({
      label: 'N/A',
      subtitle: '(N/A)',
      icon: undefined,
    })
  })
})

describe('truncatePublicComponents', () => {
  const makeComponents = (count: number): PublicComponent[] =>
    Array.from({ length: count }, (_, index) => ({ name: `component-${index}`, url: `https://host/${index}` }))

  it('returns an empty view when there are no components', () => {
    expect(truncatePublicComponents([])).toEqual({
      visible: [],
      hiddenCount: 0,
    })
  })

  it('shows all components when within the limit', () => {
    const components = makeComponents(MAX_VISIBLE_PUBLIC_COMPONENTS)
    const view = truncatePublicComponents(components)

    expect(view.visible).toEqual(components)
    expect(view.hiddenCount).toBe(0)
  })

  it('collapses extra components and reports how many are hidden', () => {
    const view = truncatePublicComponents(makeComponents(5))

    expect(view.visible).toHaveLength(MAX_VISIBLE_PUBLIC_COMPONENTS)
    expect(view.hiddenCount).toBe(5 - MAX_VISIBLE_PUBLIC_COMPONENTS)
  })
})
