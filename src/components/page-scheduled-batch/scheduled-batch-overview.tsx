import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';
import type { ScheduledBatchSummary } from '../../store/radix-api';
import { smallScheduledBatchName } from '../../utils/string';
import { BatchJobStatuses } from '../component/scheduled-job/batch-job-statuses';
import { ProgressStatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';

const ScheduledBatchDuration: FunctionComponent<{
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

const ScheduledBatchState: FunctionComponent<
  Pick<ScheduledBatchSummary, 'status'>
> = ({ status }) => <>{status && <ProgressStatusBadge status={status} />}</>;

export const ScheduledBatchOverview: FunctionComponent<{
  batch: ScheduledBatchSummary;
  jobComponentName: string;
}> = ({ batch, jobComponentName }) => (
  <>
    <Typography variant="h4">Overview</Typography>
    <section className="grid grid--gap-medium overview">
      <div className="grid grid--gap-medium grid--overview-columns">
        <div className="grid grid--gap-medium">
          <Typography>
            Batch name <strong>{smallScheduledBatchName(batch.name)}</strong>
          </Typography>
          {batch.batchId && (
            <Typography>
              Batch ID <strong>{batch.batchId}</strong>
            </Typography>
          )}
          <Typography>
            Job component <strong>{jobComponentName}</strong>
          </Typography>
          {batch.status && (
            <Typography className="status-title">
              Batch status <ScheduledBatchState status={batch.status} />
            </Typography>
          )}
          <Typography className="status-title">
            Jobs statuses
            <BatchJobStatuses jobs={batch.jobList} />
          </Typography>
        </div>
        <div className="grid grid--gap-medium">
          <>
            <Typography>
              Created{' '}
              <strong>
                <RelativeToNow time={batch.created} />
              </strong>
            </Typography>
            <ScheduledBatchDuration
              started={batch.started}
              finished={batch.ended}
            />
          </>
        </div>
      </div>
    </section>
  </>
);

ScheduledBatchOverview.propTypes = {
  batch: PropTypes.object
    .isRequired as PropTypes.Validator<ScheduledBatchSummary>,
  jobComponentName: PropTypes.string.isRequired,
};
