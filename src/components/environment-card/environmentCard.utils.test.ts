import { github, trending_up } from '@equinor/eds-icons'
import { describe, expect, it } from 'vitest'
import {
  getBuildSource,
  getPublicComponentsView,
  MAX_VISIBLE_PUBLIC_COMPONENTS,
  type PublicComponent,
} from './environmentCard.utils'

describe('getBuildSource', () => {
  it('marks a promoted deployment that has a branch mapping as automatic-but-promoted', () => {
    const source = getBuildSource({
      branchMapping: 'main',
      promotedFrom: 'qa',
      pipelineJobUrl: '/job/123',
    })

    expect(source).toEqual({
      type: 'automatic-but-promoted',
      subtitle: '(Built from main)',
      label: 'Promoted from qa',
      url: { path: '/job/123', showAsExternalUrl: false },
      icon: trending_up,
    })
  })

  it('marks a promoted deployment without a branch mapping as promote', () => {
    const source = getBuildSource({
      promotedFrom: 'qa',
      pipelineJobUrl: '/job/123',
    })

    expect(source).toEqual({
      type: 'promote',
      subtitle: '(Built manually)',
      label: 'Promoted from qa',
      url: { path: '/job/123', showAsExternalUrl: false },
      icon: trending_up,
    })
  })

  it('omits the url for a promoted deployment without a pipeline job', () => {
    const source = getBuildSource({ branchMapping: 'main', promotedFrom: 'qa' })

    expect(source.url).toBeUndefined()
  })

  it('marks a deployment built from a branch mapping as automatic with a commit link', () => {
    const source = getBuildSource({
      name: 'main',
      shortCommitId: 'abc123',
      branchMapping: 'main',
      commitUrl: 'https://repo/commit/abc123',
      promotedFrom: undefined,
    })

    expect(source).toEqual({
      type: 'automatic',
      subtitle: '(Built from main)',
      label: 'main@abc123',
      url: { path: 'https://repo/commit/abc123', showAsExternalUrl: true },
      icon: github,
    })
  })

  it('omits the url for an automatic build without a commit url', () => {
    const source = getBuildSource({
      name: 'main',
      shortCommitId: 'abc123',
      branchMapping: 'main',
      promotedFrom: undefined,
    })

    expect(source.type).toBe('automatic')
    expect(source.url).toBeUndefined()
  })

  it('marks a branch mapping with no deployment as not-built-yet', () => {
    const source = getBuildSource({ branchMapping: 'release-.*', promotedFrom: undefined })

    expect(source).toEqual({
      type: 'not-built-yet',
      subtitle: '(Built from release-.*)',
      label: 'Will build automatically',
      icon: github,
    })
  })

  it('marks a deployment with no branch mapping and no promotion as built manually', () => {
    const source = getBuildSource({ promotedFrom: undefined })

    expect(source).toEqual({
      type: 'promote',
      subtitle: '(Built manually)',
      label: 'Built manually',
      icon: trending_up,
    })
  })

  it('falls back to unknown when a branch mapping only has partial deployment info', () => {
    const source = getBuildSource({ branchMapping: 'main', name: 'main', promotedFrom: undefined })

    expect(source).toEqual({
      type: 'unknown',
      subtitle: 'N/A',
      label: 'N/A',
      icon: undefined,
    })
  })
})

describe('getPublicComponentsView', () => {
  const makeComponents = (count: number): PublicComponent[] =>
    Array.from({ length: count }, (_, index) => ({ name: `component-${index}`, url: `https://host/${index}` }))

  it('returns an empty view when there are no components', () => {
    expect(getPublicComponentsView()).toEqual({
      visible: [],
      hiddenCount: 0,
      subtitle: undefined,
    })
  })

  it('shows all components without a subtitle when within the limit', () => {
    const components = makeComponents(MAX_VISIBLE_PUBLIC_COMPONENTS)
    const view = getPublicComponentsView(components)

    expect(view.visible).toEqual(components)
    expect(view.hiddenCount).toBe(0)
    expect(view.subtitle).toBeUndefined()
  })

  it('collapses extra components and reports how many are hidden', () => {
    const view = getPublicComponentsView(makeComponents(5))

    expect(view.visible).toHaveLength(MAX_VISIBLE_PUBLIC_COMPONENTS)
    expect(view.hiddenCount).toBe(5 - MAX_VISIBLE_PUBLIC_COMPONENTS)
    expect(view.subtitle).toBe(`(+${5 - MAX_VISIBLE_PUBLIC_COMPONENTS} more)`)
  })

  it('respects a custom max limit', () => {
    const view = getPublicComponentsView(makeComponents(3), 1)

    expect(view.visible).toHaveLength(1)
    expect(view.hiddenCount).toBe(2)
    expect(view.subtitle).toBe('(+2 more)')
  })
})
