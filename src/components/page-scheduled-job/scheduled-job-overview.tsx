import { Typography } from '@equinor/eds-core-react';
import { isNil } from 'lodash-es';
import type { FunctionComponent } from 'react';
import type { ScheduledJobSummary } from '../../store/radix-api';
import {
  smallScheduledBatchName,
  smallScheduledJobName,
} from '../../utils/string';
import { Code } from '../code';
import { CommandAndArgs } from '../component/command-and-args';
import { ComponentDeployment } from '../component/component-deployment';
import { ResourceRequirements } from '../resource-requirements';
import { Runtime } from '../runtime';
import { RadixJobConditionBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';

const ScheduledJobDuration: FunctionComponent<{
  started: string;
  finished?: string;
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
  appName: string;
}> = ({ job, jobComponentName, appName }) => {
  return (
    <>
      <Typography variant="h4">Overview</Typography>
      <section className="grid grid--gap-medium overview">
        <div className="grid grid--gap-medium grid--overview-columns">
          <div className="grid grid--gap-medium">
            <Typography>
              Job component <strong>{jobComponentName}</strong>
            </Typography>
            {job.batchName && (
              <Typography>
                Batch name{' '}
                <strong>{smallScheduledBatchName(job.batchName)}</strong>
              </Typography>
            )}
            <Typography>
              Job name <strong>{smallScheduledJobName(job.name)}</strong>
            </Typography>
            {job.jobId && (
              <Typography>
                Job ID <strong>{job.jobId}</strong>
              </Typography>
            )}
            <ComponentDeployment
              appName={appName}
              componentName={jobComponentName}
              deploymentName={job.deploymentName}
            />
            <CommandAndArgs command={job.command} args={job.args} />
          </div>
          <div className="grid grid--gap-medium">
            <>
              <Typography>
                Created{' '}
                <strong>
                  <RelativeToNow time={job.created} />
                </strong>
              </Typography>
              {job.started && (
                <ScheduledJobDuration
                  started={job.started}
                  finished={job.ended}
                />
              )}
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
};
