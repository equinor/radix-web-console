import { github, trending_up } from '@equinor/eds-icons'
import { describe, expect, it } from 'vitest'
import type { PublicComponent } from './environmentCard.types'
import { getBuildSourceView, MAX_VISIBLE_PUBLIC_COMPONENTS, truncatePublicComponents } from './environmentCard.utils'

describe('getBuildSourceView', () => {
  it('shows the git ref, commit and an external commit link for an automatic build', () => {
    const view = getBuildSourceView({
      kind: 'build-deployed',
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

  it('omits the url for an automatic build without a commit url', () => {
    const view = getBuildSourceView({
      kind: 'build-deployed',
      branchMapping: 'main',
      gitRef: 'main',
      shortCommitId: 'abc123',
    })

    expect(view.url).toBeUndefined()
  })

  it('shows where a promoted deployment was promoted from with an internal job link', () => {
    const view = getBuildSourceView({
      kind: 'promoted',
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
    const view = getBuildSourceView({ kind: 'promoted', promotedFrom: 'qa' })

    expect(view.subtitle).toBe('(Deployed manually)')
    expect(view.url).toBeUndefined()
  })

  it('shows a placeholder for a branch mapping with no deployment yet', () => {
    expect(getBuildSourceView({ kind: 'automatic-not-deployed-yet', branchMapping: 'main' })).toEqual({
      label: 'Will build automatically',
      subtitle: '(Built from main)',
      icon: github,
    })
  })

  it('labels a promoted-not-built-yet source as deployed manually', () => {
    expect(getBuildSourceView({ kind: 'manual-not-deployed-yet' })).toEqual({
      label: 'Not yet deployed',
      subtitle: '(Deployed manually)',
      icon: trending_up,
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
