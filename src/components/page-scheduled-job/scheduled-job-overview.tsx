import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { Code } from '../code';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { ScheduledJobSummary } from '../../store/radix-api';
import { smallScheduledJobName } from '../../utils/string';
import { ResourceRequirements } from '../resource-requirements';
import { isNil } from 'lodash';
import { RadixJobConditionBadge } from '../status-badges';

const ScheduledJobDuration: FunctionComponent<{
  started: string;
  finished: string;
}> = ({ started, finished }) => {
  return (
    <>
      <Typography>
        Started{' '}
        <strong>
          <RelativeToNow time={started} />
        </strong>
      </Typography>
      {finished && (
        <>
          <Typography>
            Ended{' '}
            <strong>
              <RelativeToNow time={finished} />
            </strong>
          </Typography>
          <Typography>
            Duration{' '}
            <strong>
              <Duration start={started} end={finished} />
            </strong>
          </Typography>
        </>
      )}
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

    {status && <RadixJobConditionBadge status={status} />}

    {message && (
      <>
        <Typography>Status message</Typography>
        <Code>{message}</Code>
      </>
    )}
  </>
);

export const ScheduledJobOverview: FunctionComponent<{
  job: ScheduledJobSummary;
  jobComponentName: string;
}> = ({ job, jobComponentName }) => {
  console.log({ job });
  return (
    <>
      <Typography variant="h4">Overview</Typography>
      <section className="grid grid--gap-medium overview">
        <div className="grid grid--gap-medium grid--overview-columns">
          <div className="grid grid--gap-medium">
            <Typography>
              Name <strong>{smallScheduledJobName(job.name)}</strong>
            </Typography>
            {job.jobId && (
              <Typography>
                Job ID <strong>{job.jobId}</strong>
              </Typography>
            )}
            <Typography>
              Job <strong>{jobComponentName}</strong>
            </Typography>
          </div>
          <div className="grid grid--gap-medium">
            <>
              <Typography>
                Created{' '}
                <strong>
                  <RelativeToNow time={job.created} />
                </strong>
              </Typography>
              <ScheduledJobDuration
                started={job.started}
                finished={job.ended}
              />
            </>
          </div>
          <div className="grid grid--gap-medium">
            <ResourceRequirements resources={job.resources} />
            <Typography>
              Backoff Limit <strong>{job.backoffLimit}</strong>
            </Typography>
            <Typography>
              Time Limit{' '}
              <strong>
                {!isNil(job.timeLimitSeconds) ? (
                  <Duration start={0} end={job.timeLimitSeconds * 1000} />
                ) : (
                  'Not set'
                )}
              </strong>
            </Typography>
          </div>
        </div>
      </section>
      <section className="grid grid--gap-medium">
        {job.status && <ScheduledJobState {...job} />}
      </section>
    </>
  );
};

ScheduledJobOverview.propTypes = {
  job: PropTypes.object.isRequired as PropTypes.Validator<ScheduledJobSummary>,
  jobComponentName: PropTypes.string.isRequired,
};
