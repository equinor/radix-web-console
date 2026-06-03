import { Typography } from '@equinor/eds-core-react'
import { Duration } from '../../../components/time/duration'
import { RelativeToNow } from '../../../components/time/relative-to-now'
import type { ScheduledJobSummary } from '../../../store/radix-api'
import { pluraliser } from '../../../utils/string'

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
