import type { DailyAvailability, DayStatus } from './availability.types'

const RATIO_BY_STATUS: Record<DayStatus, number | null> = {
  operational: 1,
  good: 0.995,
  fair: 0.97,
  poor: 0.92,
  critical: 0.6,
  'no-data': null,
}

const buildDailyAvailability = (statuses: DayStatus[]): DailyAvailability[] =>
  statuses.map((status, dayIndex) => ({
    date: new Date(2024, 0, dayIndex + 1),
    ratio: RATIO_BY_STATUS[status],
    status,
  }))

const repeat = (status: DayStatus, count: number): DayStatus[] => Array.from({ length: count }, () => status)

export const mockPerfectUptime = buildDailyAvailability(repeat('operational', 30))

export const mockMixedUptime = buildDailyAvailability([
  ...repeat('operational', 15),
  'good',
  'good',
  'fair',
  'poor',
  'critical',
  ...repeat('operational', 4),
  'no-data',
  'no-data',
  'good',
  'fair',
  'poor',
  'operational',
])
