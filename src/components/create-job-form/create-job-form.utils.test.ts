import { describe, expect, it } from 'vitest'
import { getSelectedPipelineName, isSupportedPipelineName } from './create-job-form.utils'

describe('isSupportedPipelineName', () => {
  it('returns true for a known pipeline name', () => {
    expect(isSupportedPipelineName('build-deploy')).toBe(true)
  })

  it('returns false for an unknown pipeline name', () => {
    expect(isSupportedPipelineName('not-a-pipeline')).toBe(false)
  })

  it('returns false for null', () => {
    expect(isSupportedPipelineName(null)).toBe(false)
  })

  it('returns false for an Object.prototype key', () => {
    expect(isSupportedPipelineName('toString')).toBe(false)
  })
})

describe('getSelectedPipelineName', () => {
  it('uses the url pipeline when it is a supported name', () => {
    expect(getSelectedPipelineName('promote', true)).toBe('promote')
  })

  it('falls back to build-deploy when the url pipeline is unknown and build branches exist', () => {
    expect(getSelectedPipelineName('unknown', true)).toBe('build-deploy')
  })

  it('falls back to build-deploy when there is no url pipeline and build branches exist', () => {
    expect(getSelectedPipelineName(null, true)).toBe('build-deploy')
  })

  it('returns undefined when there is no url pipeline and no build branches', () => {
    expect(getSelectedPipelineName(null, false)).toBeUndefined()
  })
})
