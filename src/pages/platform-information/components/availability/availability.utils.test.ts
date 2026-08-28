import { describe, expect, it } from 'vitest'
import type { UptimeSample } from './availability.types'
import { getDailyAvailability, toDayStatus } from './availability.utils'

describe('toDayStatus', () => {
  it('is no-data for a null ratio', () => {
    expect(toDayStatus(null)).toBe('no-data')
  })

  it('is operational at 100%', () => {
    expect(toDayStatus(1)).toBe('operational')
  })

  it('is good just below 100%', () => {
    expect(toDayStatus(0.995)).toBe('good')
  })

  it('is fair at 96%', () => {
    expect(toDayStatus(0.96)).toBe('fair')
  })

  it('is poor at 92%', () => {
    expect(toDayStatus(0.92)).toBe('poor')
  })

  it('is critical at 80%', () => {
    expect(toDayStatus(0.8)).toBe('critical')
  })

  it('is critical at 0%', () => {
    expect(toDayStatus(0)).toBe('critical')
  })
})

describe('getDailyAvailability', () => {
  const now = new Date('2024-01-30T12:00:00Z')
  const todaySeconds = Math.floor(now.getTime() / 1000)

  it('returns one entry per day for the requested range', () => {
    expect(getDailyAvailability([], 30, now)).toHaveLength(30)
  })

  it('marks a day with no samples as no-data', () => {
    const [firstDay] = getDailyAvailability([], 3, now)
    expect(firstDay.status).toBe('no-data')
  })

  it('reports a null ratio for a day with no samples', () => {
    const [firstDay] = getDailyAvailability([], 3, now)
    expect(firstDay.ratio).toBeNull()
  })

  it('marks a fully available day as operational', () => {
    const samples: UptimeSample[] = [
      [todaySeconds, '1'],
      [todaySeconds, '1'],
    ]
    expect(getDailyAvailability(samples, 1, now).at(-1)?.status).toBe('operational')
  })

  it('computes the available fraction for a partial day', () => {
    const samples: UptimeSample[] = [
      [todaySeconds, '1'],
      [todaySeconds, '0'],
    ]
    expect(getDailyAvailability(samples, 1, now).at(-1)?.ratio).toBe(0.5)
  })
})
