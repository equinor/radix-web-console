import { Button, CircularProgress, Typography } from '@equinor/eds-core-react'
import { clsx } from 'clsx'
import { useState } from 'react'
import { Chart, type ChartWrapperOptions } from 'react-google-charts'
import { Dialog } from '../../../../components/dialog/Dialog'
import { ExternalLink } from '../../../../components/link/external-link'
import { externalUrls } from '../../../../externalUrls'
import { useGetUptimeQuery } from '../../../../store/uptime-api'
import { AvailabilityTimeline } from './AvailabilityTimeline'
import { getDailyAvailability } from './availability.utils'
import styles from './availabilityOverview.module.css'

export const AvailabilityOverview = () => {
  const { data: uptime, isLoading, isError } = useGetUptimeQuery()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  if (isError) {
    return <Typography>Failed to load availability data</Typography>
  }

  if (isLoading) {
    return (
      <Typography as="span">
        <CircularProgress size={16} /> Loading
      </Typography>
    )
  }

  if (!uptime || uptime.length === 0) {
    return <Typography variant="body_short_bold">Not enough data to display charts</Typography>
  }

  const data = uptime.map(([timestamp, available]) => [new Date(timestamp * 1000), Number(available)])
  const dailyAvailability = getDailyAvailability(uptime)

  return (
    <>
      <AvailabilityTimeline days={dailyAvailability} onViewHistory={() => setIsDialogOpen(true)} />

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} isDismissable width="48rem">
        <Dialog.Header>Availability History</Dialog.Header>
        <Dialog.Content>
          <div className={clsx('grid grid--gap-medium', styles.chartContainer)}>
            <Typography>
              For more information on availability, please check the{' '}
              <ExternalLink href={externalUrls.uptimeDocs}>documentation</ExternalLink>.
            </Typography>

            <Chart
              chartType="SteppedAreaChart"
              className={styles.chartArea}
              data={[['Date', 'Available'], ...data]}
              options={CHART_OPTIONS}
            />
          </div>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}

const CHART_OPTIONS: ChartWrapperOptions['options'] = {
  colors: ['#007079'],
  connectSteps: true,
  areaOpacity: 0.15,
  vAxis: {
    viewWindow: { min: 0, max: 1 },
    // Availability is a binary state, so label the axis instead of showing 0/1.
    // The { v, f } tick form is valid Google Charts but missing from the library types.
    ticks: [
      { v: 0, f: 'Down' },
      { v: 1, f: 'Up' },
    ] as unknown as number[],
    gridlines: { count: 2 },
  },
  hAxis: {
    format: 'MMM d',
  },
  legend: 'none',
  animation: {
    duration: 500,
    easing: 'out',
  },
  selectionMode: 'multiple',
  tooltip: {
    isHtml: true,
    trigger: 'both',
  },
  aggregationTarget: 'none',
}
