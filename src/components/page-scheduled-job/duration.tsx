import { Typography } from '@equinor/eds-core-react'
import type { FunctionComponent } from 'react'
import type { ScheduledJobSummary } from '../../store/radix-api'
import { pluraliser } from '../../utils/string'
import { Duration } from '../time/duration'
import { RelativeToNow } from '../time/relative-to-now'

const timesPluraliser = pluraliser('time', 'times')

export const ScheduleJobDuration: FunctionComponent<{
  job: ScheduledJobSummary
}> = ({ job: { created, started, ended, failedCount } }) => (
  <>
    <Typography>
      Created{' '}
      <strong>
        <RelativeToNow time={new Date(created)} />
      </strong>
    </Typography>
    <Typography>
      Started{' '}
      <strong>
        <RelativeToNow time={new Date(started)} />
      </strong>
    </Typography>
    {ended && (
      <>
        <Typography>
          Ended{' '}
          <strong>
            <RelativeToNow time={new Date(ended)} />
          </strong>
        </Typography>
        <Typography>
          Duration{' '}
          <strong>
            <Duration start={new Date(started)} end={new Date(ended)} />
          </strong>
        </Typography>
      </>
    )}

    {failedCount > 0 && (
      <Typography>
        Failed <strong>{timesPluraliser(failedCount)}</strong>
      </Typography>
    )}
  </>
)
