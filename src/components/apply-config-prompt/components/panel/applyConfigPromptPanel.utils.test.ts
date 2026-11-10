import { describe, expect, it } from 'vitest'
import { getOnboardingStepState, getRepositoryDisplayName } from './applyConfigPromptPanel.utils'

describe('getOnboardingStepState', () => {
  it('marks steps before the current one as done', () => {
    expect(getOnboardingStepState(0)).toBe('done')
  })

  it('marks the apply-config step as current', () => {
    expect(getOnboardingStepState(1)).toBe('current')
  })

  it('marks steps after the current one as upcoming', () => {
    expect(getOnboardingStepState(2)).toBe('upcoming')
  })

  it('marks the apply-config step as failed when applying the config has failed', () => {
    expect(getOnboardingStepState(1, true)).toBe('failed')
  })

  it('leaves completed and upcoming steps unchanged when applying the config has failed', () => {
    expect(getOnboardingStepState(0, true)).toBe('done')
    expect(getOnboardingStepState(2, true)).toBe('upcoming')
  })
})

describe('getRepositoryDisplayName', () => {
  it('strips the host from a GitHub repository URL', () => {
    expect(getRepositoryDisplayName('https://github.com/equinor/my-app')).toBe('equinor/my-app')
  })

  it('strips a trailing slash', () => {
    expect(getRepositoryDisplayName('https://github.com/equinor/my-app/')).toBe('equinor/my-app')
  })

  it('returns the input unchanged when it is not a URL', () => {
    expect(getRepositoryDisplayName('equinor/my-app')).toBe('equinor/my-app')
  })

  it('returns the input unchanged when the URL has no path', () => {
    expect(getRepositoryDisplayName('https://github.com')).toBe('https://github.com')
  })
})
