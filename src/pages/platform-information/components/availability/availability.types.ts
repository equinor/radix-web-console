export type UptimeSample = [timestamp: number, available: string]

export type DayStatus = 'operational' | 'good' | 'fair' | 'poor' | 'critical' | 'no-data'

export interface DailyAvailability {
  readonly date: Date
  /** Fraction of samples that were available (0–1), or null when the day has no samples. */
  readonly ratio: number | null
  readonly status: DayStatus
}
