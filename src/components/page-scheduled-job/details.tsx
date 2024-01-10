import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useState } from 'react';
import { Code } from '../code';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { useInterval } from '../../effects/use-interval';
import { ScheduledJobSummary } from '../../store/radix-api';
import { smallScheduledJobName } from '../../utils/string';

const ScheduledJobDuration: FunctionComponent<{ created: Date }> = ({
  created,
}) => {
  const [now, setNow] = useState(new Date());
  useInterval(() => setNow(new Date()), 1000);

  return (
    <>
      <Typography>
        Job created{' '}
        <strong>
          <RelativeToNow time={created} />
        </strong>
      </Typography>
      <Typography>
        Job duration{' '}
        <strong>
          <Duration start={created} end={now} />
        </strong>
      </Typography>
    </>
  );
};

const ContainerDuration: FunctionComponent<{ started: Date }> = ({
  started,
}) => {
  const [now, setNow] = useState(new Date());
  useInterval(() => setNow(new Date()), 1000);

  return (
    <>
      <Typography>
        Container started{' '}
        <strong>
          <RelativeToNow time={started} />
        </strong>
      </Typography>
      <Typography>
        Container duration{' '}
        <strong>
          <Duration start={started} end={now} />
        </strong>
      </Typography>
    </>
  );
};

const ScheduledJobState: FunctionComponent<
  Pick<ScheduledJobSummary, 'failedCount' | 'message' | 'status'>
> = ({ failedCount, message, status }) => (
  <>
    {!Number.isNaN(failedCount) && failedCount > 0 && (
      <div>
        <Typography>
          Failed <strong>{failedCount} times</strong>
        </Typography>
      </div>
    )}

    {status && (
      <>
        <Typography>Status</Typography>
        <Code>{status}</Code>
      </>
    )}

    {message && (
      <>
        <Typography>Status message</Typography>
        <Code>{message}</Code>
      </>
    )}
  </>
);

export const Job: FunctionComponent<{ job: ScheduledJobSummary }> = ({
  job,
}) => (
  <>
    <section className="grid grid--gap-medium overview">
      <div className="grid grid--gap-medium grid--overview-columns">
        <div className="grid grid--gap-medium">
          <Typography>
            Job <strong>{smallScheduledJobName(job.name)}</strong>
          </Typography>
        </div>
        <div className="grid grid--gap-medium">
          {job.created || (
            <>
              <ScheduledJobDuration created={new Date(job.created)} />
              {job.started && (
                <ContainerDuration started={new Date(job.created)} />
              )}
            </>
          )}
        </div>
      </div>
    </section>
    <section className="grid grid--gap-medium">
      {job.status || <ScheduledJobState {...job} />}
    </section>
  </>
);

Job.propTypes = {
  job: PropTypes.object.isRequired as PropTypes.Validator<ScheduledJobSummary>,
};
