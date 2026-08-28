import { Button, EdsProvider, Tooltip, Typography } from '@equinor/eds-core-react'
import { clsx } from 'clsx'
import type { DailyAvailability, DayStatus } from './availability.types'
import { getAverageAvailability } from './availability.utils'
import styles from './availabilityTimeline.module.css'

interface AvailabilityTimelineProps {
  readonly days: ReadonlyArray<DailyAvailability>
  readonly onViewHistory?: () => void
}

const STATUS_CLASS: Readonly<Record<DayStatus, string>> = {
  operational: styles.operational,
  good: styles.good,
  fair: styles.fair,
  poor: styles.poor,
  critical: styles.critical,
  'no-data': styles.noData,
}

const formatDayTitle = (day: DailyAvailability): string => {
  const label = day.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  return day.ratio == null ? `${label}: No data` : `${label}: ${(day.ratio * 100).toFixed(1)}% available`
}

export const AvailabilityTimeline = (props: AvailabilityTimelineProps) => {
  const { days, onViewHistory } = props

  const availabilitySummary = getAverageAvailability(days)

  return (
    <div className={styles.timeline}>
      <div className={styles.timelineHead}>
        <Typography variant="body_short_bold" as="p">
          Last {days.length} days - Availability: {availabilitySummary.toFixed(2)}%
        </Typography>
        {onViewHistory && (
          <EdsProvider density="compact">
            <Button variant="ghost" onClick={onViewHistory} className={styles.viewHistory}>
              View history
            </Button>
          </EdsProvider>
        )}
      </div>
      <div className={styles.bars} role="img" aria-label={`Daily availability for the last ${days.length} days`}>
        {days.map((day) => (
          <Tooltip key={day.date.toISOString()} title={formatDayTitle(day)}>
            <span className={clsx(styles.bar, STATUS_CLASS[day.status] ?? styles.noData)} />
          </Tooltip>
        ))}
      </div>
    </div>
  )
}
