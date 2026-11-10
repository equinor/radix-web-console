import { describe, expect, it } from 'vitest'
import type { JobSummary } from '../../store/radix-api'
import { getApplyConfigPromptStatus } from './applyConfigPrompt.utils'

const mockJob = (status?: JobSummary['status']): JobSummary => ({ name: 'job', status, triggeredFromWebhook: false })

describe('getApplyConfigPromptStatus', () => {
  it('is not-started when there is no job', () => {
    expect(getApplyConfigPromptStatus(undefined)).toBe('not-started')
  })

  it.each<JobSummary['status']>([
    'Queued',
    'Waiting',
    'Running',
    'Stopping',
  ])('is in-progress when the job is %s', (status) => {
    expect(getApplyConfigPromptStatus(mockJob(status))).toBe('in-progress')
  })

  it('is failed when the job failed', () => {
    expect(getApplyConfigPromptStatus(mockJob('Failed'))).toBe('failed')
  })

  it.each<JobSummary['status']>(['Stopped', 'StoppedNoChanges'])('is failed when the job was %s', (status) => {
    expect(getApplyConfigPromptStatus(mockJob(status))).toBe('failed')
  })

  it('is not-started when the job succeeded without producing environments', () => {
    expect(getApplyConfigPromptStatus(mockJob('Succeeded'))).toBe('not-started')
  })

  it('is not-started when the job has no status', () => {
    expect(getApplyConfigPromptStatus(mockJob(undefined))).toBe('not-started')
  })

  it('is not-started when the job status is one this code does not know', () => {
    expect(getApplyConfigPromptStatus(mockJob('SomethingNew' as JobSummary['status']))).toBe('not-started')
  })
})
