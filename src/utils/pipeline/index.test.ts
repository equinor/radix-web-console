import { describe, expect, it } from 'vitest'
import type { JobSummary } from '../../store/radix-api'
import { getLatestPipelineJob } from '.'

const mockJob = (name: string, created: string): JobSummary => ({ name, created, triggeredFromWebhook: false })

describe('getLatestPipelineJob', () => {
  it('is undefined when there are no jobs', () => {
    expect(getLatestPipelineJob(undefined)).toBeUndefined()
    expect(getLatestPipelineJob([])).toBeUndefined()
  })

  it('returns the most recently created job regardless of input order', () => {
    const older = mockJob('older', '2024-01-01T10:00:00Z')
    const newer = mockJob('newer', '2024-01-01T12:00:00Z')

    expect(getLatestPipelineJob([older, newer])?.name).toBe('newer')
    expect(getLatestPipelineJob([newer, older])?.name).toBe('newer')
  })

  it('does not mutate the input array', () => {
    const jobs = [mockJob('older', '2024-01-01T10:00:00Z'), mockJob('newer', '2024-01-01T12:00:00Z')]
    getLatestPipelineJob(jobs)
    expect(jobs.map((job) => job.name)).toEqual(['older', 'newer'])
  })
})
