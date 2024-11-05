import { Typography } from '@equinor/eds-core-react';
import { isNil } from 'lodash';
import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';
import type { ScheduledJobSummary } from '../../store/radix-api';
import { smallScheduledJobName } from '../../utils/string';
import { Code } from '../code';
import { ResourceRequirements } from '../resource-requirements';
import { Runtime } from '../runtime';
import { RadixJobConditionBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';

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
}> = ({ job, jobComponentName }) => (
  <>
    <Typography variant="h4">Overview</Typography>
    <section className="grid grid--gap-medium overview">
      <div className="grid grid--gap-medium grid--overview-columns">
        <div className="grid grid--gap-medium">
          <Typography>
            Job name <strong>{smallScheduledJobName(job.name)}</strong>
          </Typography>
          {job.jobId && (
            <Typography>
              Job ID <strong>{job.jobId}</strong>
            </Typography>
          )}
          <Typography>
            Job component <strong>{jobComponentName}</strong>
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
            <ScheduledJobDuration started={job.started} finished={job.ended} />
          </>
        </div>
        <div className="grid grid--gap-medium">
          {job.runtime && <Runtime runtime={job.runtime!} />}
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

ScheduledJobOverview.propTypes = {
  job: PropTypes.object.isRequired as PropTypes.Validator<ScheduledJobSummary>,
  jobComponentName: PropTypes.string.isRequired,
};
