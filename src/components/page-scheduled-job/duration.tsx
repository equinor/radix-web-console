import { Typography } from '@equinor/eds-core-react'
import type { ScheduledJobSummary } from '../../store/radix-api'
import { pluraliser } from '../../utils/string'
import { Duration } from '../time/duration'
import { RelativeToNow } from '../time/relative-to-now'

const timesPluraliser = pluraliser('time', 'times')

type Props = {
  job: ScheduledJobSummary
}
export const ScheduleJobDuration = ({ job: { created, started, ended, failedCount } }: Props) => (
  <>
    <Typography>
      Created{' '}
      <strong>
        <RelativeToNow time={created} />
      </strong>
    </Typography>
    <Typography>
      Started{' '}
      <strong>
        <RelativeToNow time={started} />
      </strong>
    </Typography>
    {ended && (
      <>
        <Typography>
          Ended{' '}
          <strong>
            <RelativeToNow time={ended} />
          </strong>
        </Typography>
        <Typography>
          Duration{' '}
          <strong>
            <Duration start={started} end={ended} />
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
