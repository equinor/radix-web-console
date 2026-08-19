import { Typography } from '@equinor/eds-core-react'
import { RelativeToNow } from '../../../../components/time/relative-to-now'
import type { Component } from '../../../../store/radix-api'
import styles from './cronSchedule.module.css'

interface CronScheduleProps {
  readonly component: Pick<Component, 'nextRun' | 'cronSchedules'>
  readonly className?: string
}

/**
 * Renders a section with the cron schedule and next run time for a scheduled job component.
 * If the component is not a scheduled job (i.e. has no next run), nothing is rendered.
 */
export const CronSchedule = (props: CronScheduleProps) => {
  const { component, className } = props

  const isScheduledJob = !!component.nextRun

  if (!isScheduledJob) {
    return null
  }

  return (
    <section className={className}>
      <Typography variant="h4" as="h5">
        Cron schedule
      </Typography>
      <dl className={styles.descriptionList}>
        <dt className={styles.scheduleTitle}>Schedule</dt>
        <dd className={styles.scheduleList}>
          {component.cronSchedules?.map((schedule) => (
            <code key={schedule}>{schedule}</code>
          ))}
        </dd>
        <dt>Next run</dt>
        <dd>
          <strong>
            <RelativeToNow capitalize time={component.nextRun} />
          </strong>
        </dd>
      </dl>
    </section>
  )
}
