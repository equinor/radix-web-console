import { describe, expect, it } from 'vitest'
import type { Environment, JobSummary } from '../../../../../store/radix-api'
import { getApplicationStatusItems } from './applicationStatusPopover.utils'

const mockEnvironment = (): Environment => ({}) as Environment

describe('getApplicationStatusItems', () => {
  it('always includes the environments item', () => {
    const items = getApplicationStatusItems([mockEnvironment()])

    expect(items.map((item) => item.label)).toEqual(['Environments'])
  })

  it('omits the latest job item when there is no job', () => {
    const items = getApplicationStatusItems([mockEnvironment()], undefined)

    expect(items.some((item) => item.label === 'Latest job')).toBe(false)
  })

  it('includes the latest job item when a job exists', () => {
    const latestJob: Pick<JobSummary, 'status'> = { status: 'Failed' }

    const items = getApplicationStatusItems([mockEnvironment()], latestJob)

    expect(items.map((item) => item.label)).toEqual(['Environments', 'Latest job'])
  })

  it('reflects the latest job status in the latest job item alert level', () => {
    const latestJob: Pick<JobSummary, 'status'> = { status: 'Failed' }

    const items = getApplicationStatusItems([mockEnvironment()], latestJob)
    const latestJobItem = items.find((item) => item.label === 'Latest job')

    expect(latestJobItem?.alertLevel).toBe('Danger')
  })
})
