import { describe, expect, it } from 'vitest'
import type { Job } from '../../../store/radix-api'
import { canStopJob, getBuildCacheStatus, getStopButtonText } from './pipeline-job.utils'

const makeJob = (overrides: Partial<Job> = {}): Job => ({
  triggeredFromWebhook: false,
  ...overrides,
})

describe('canStopJob', () => {
  it('allows stopping a queued job', () => {
    expect(canStopJob('Queued')).toBe(true)
  })

  it('allows stopping a waiting job', () => {
    expect(canStopJob('Waiting')).toBe(true)
  })

  it('allows stopping a running job', () => {
    expect(canStopJob('Running')).toBe(true)
  })

  it('allows stopping a job that is already stopping', () => {
    expect(canStopJob('Stopping')).toBe(true)
  })

  it('does not allow stopping a succeeded job', () => {
    expect(canStopJob('Succeeded')).toBe(false)
  })

  it('does not allow stopping a failed job', () => {
    expect(canStopJob('Failed')).toBe(false)
  })

  it('does not allow stopping a stopped job', () => {
    expect(canStopJob('Stopped')).toBe(false)
  })

  it('does not allow stopping a job with no changes', () => {
    expect(canStopJob('StoppedNoChanges')).toBe(false)
  })

  it('does not allow stopping when the status is unknown', () => {
    expect(canStopJob(undefined)).toBe(false)
  })
})

describe('getStopButtonText', () => {
  it('offers to cancel a queued job', () => {
    expect(getStopButtonText('Queued')).toBe('Cancel')
  })

  it('offers to cancel a waiting job', () => {
    expect(getStopButtonText('Waiting')).toBe('Cancel')
  })

  it('offers to stop a running job', () => {
    expect(getStopButtonText('Running')).toBe('Stop')
  })

  it('offers to stop a job that is already stopping', () => {
    expect(getStopButtonText('Stopping')).toBe('Stop')
  })

  it('offers no action for a succeeded job', () => {
    expect(getStopButtonText('Succeeded')).toBeUndefined()
  })

  it('offers no action for a failed job', () => {
    expect(getStopButtonText('Failed')).toBeUndefined()
  })

  it('offers no action for a stopped job', () => {
    expect(getStopButtonText('Stopped')).toBeUndefined()
  })

  it('offers no action for a job with no changes', () => {
    expect(getStopButtonText('StoppedNoChanges')).toBeUndefined()
  })

  it('offers no action when the status is unknown', () => {
    expect(getStopButtonText(undefined)).toBeUndefined()
  })
})

describe('getBuildCacheStatus', () => {
  it('reports the cache as used by default when nothing is configured', () => {
    expect(getBuildCacheStatus(makeJob())).toBe('used')
  })

  it('reports the cache as used when useBuildCache is enabled', () => {
    expect(getBuildCacheStatus(makeJob({ useBuildCache: true }))).toBe('used')
  })

  it('reports the cache as not used when useBuildCache is disabled', () => {
    expect(getBuildCacheStatus(makeJob({ useBuildCache: false }))).toBe('not used')
  })

  it('reports the cache as used when the override enables it', () => {
    expect(getBuildCacheStatus(makeJob({ overrideUseBuildCache: true }))).toBe('used')
  })

  it('reports the cache as not used when the override disables it', () => {
    expect(getBuildCacheStatus(makeJob({ overrideUseBuildCache: false }))).toBe('not used')
  })

  it('lets the override win over useBuildCache', () => {
    expect(getBuildCacheStatus(makeJob({ overrideUseBuildCache: false, useBuildCache: true }))).toBe('not used')
  })

  it('marks the cache as refreshed when a rebuild is forced', () => {
    expect(getBuildCacheStatus(makeJob({ refreshBuildCache: true }))).toBe('refreshed, used')
  })

  it('combines a forced refresh with a disabling override', () => {
    expect(getBuildCacheStatus(makeJob({ refreshBuildCache: true, overrideUseBuildCache: false }))).toBe(
      'refreshed, not used'
    )
  })
})
