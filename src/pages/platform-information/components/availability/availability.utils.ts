import type { DailyAvailability, DayStatus, UptimeSample } from './availability.types'

const MS_PER_DAY = 24 * 60 * 60 * 1000

const toDayKey = (date: Date): string => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

/** Maps a day's availability ratio (0–1, or null for no samples) to a severity level. */
export const toDayStatus = (ratio: number | null): DayStatus => {
  if (ratio == null) {
    return 'no-data'
  }
  if (ratio >= 0.999) {
    return 'operational'
  }
  if (ratio >= 0.99) {
    return 'good'
  }
  if (ratio >= 0.95) {
    return 'fair'
  }
  if (ratio >= 0.9) {
    return 'poor'
  }
  return 'critical'
}

/** Buckets uptime samples into one entry per calendar day for the last `days` days, ending today. */
export const getDailyAvailability = (
  samples: UptimeSample[],
  days = 30,
  now: Date = new Date()
): DailyAvailability[] => {
  const buckets = new Map<string, { available: number; total: number }>()
  for (const [timestamp, available] of samples) {
    const key = toDayKey(new Date(timestamp * 1000))
    const bucket = buckets.get(key) ?? { available: 0, total: 0 }
    bucket.total += 1
    if (available === '1') {
      bucket.available += 1
    }
    buckets.set(key, bucket)
  }

  const dailyAvailability: DailyAvailability[] = []
  for (let dayOffset = days - 1; dayOffset >= 0; dayOffset--) {
    const date = new Date(now.getTime() - dayOffset * MS_PER_DAY)
    const bucket = buckets.get(toDayKey(date))
    const ratio = bucket ? bucket.available / bucket.total : null
    dailyAvailability.push({ date, ratio, status: toDayStatus(ratio) })
  }
  return dailyAvailability
}

/** Mean availability (%) across the days that have samples; 0 when none do. */
export const getAverageAvailability = (days: ReadonlyArray<DailyAvailability>): number => {
  const ratedDays = days.filter((day) => day.ratio != null)
  if (ratedDays.length === 0) {
    return 0
  }
  const totalRatio = ratedDays.reduce((sum, day) => sum + (day.ratio ?? 0), 0)
  return (totalRatio / ratedDays.length) * 100
}
