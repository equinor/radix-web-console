import { Typography } from '@equinor/eds-core-react';
import { isNil } from 'lodash';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';

import { JobReplicaLogAccordion } from './replica-log-accordion';

import AsyncResource from '../async-resource/another-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { Code } from '../code';
import { downloadLazyLogCb } from '../code/log-helper';
import { Replica } from '../replica';
import { ReplicaResources } from '../replica-resources';
import { ProgressStatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { routes } from '../../routes';
import {
  ScheduledJobSummary,
  radixApi,
  useGetJobQuery,
  useJobLogQuery,
} from '../../store/radix-api';
import { withRouteParams } from '../../utils/router';
import { getEnvsUrl } from '../../utils/routing';
import { dataSorter, sortCompareDate } from '../../utils/sort-utils';
import {
  pluraliser,
  routeWithParams,
  smallScheduledJobName,
} from '../../utils/string';

import './style.css';

const timesPluraliser = pluraliser('time', 'times');

const ScheduleJobDuration: FunctionComponent<{
  job: ScheduledJobSummary;
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
);

const ScheduledJobState: FunctionComponent<
  Pick<ScheduledJobSummary, 'message' | 'status' | 'replicaList'>
> = ({ message, replicaList, status }) => (
  <>
    {status === 'Failed' &&
      replicaList[0]?.replicaStatus?.status === 'Failing' && (
        <Typography>
          Error <strong>{replicaList[0].statusMessage}</strong>
        </Typography>
      )}

    {message && <Code>{message}</Code>}
  </>
);

function isJobSettled(status: ScheduledJobSummary['status']): boolean {
  switch (status) {
    case 'Waiting':
    case 'Running':
    case 'Stopping':
      return false;

    case 'Failed':
    case 'Stopped':
    case 'Succeeded':
      return true;
  }

  return false;
}

export const PageScheduledJob: FunctionComponent<{
  appName: string;
  jobComponentName: string;
  envName: string;
  scheduledJobName: string;
}> = ({ appName, envName, jobComponentName, scheduledJobName }) => {
  const [pollingInterval, setPollingInterval] = useState(5000);
  const pollLogsState = useJobLogQuery(
    { appName, envName, jobComponentName, scheduledJobName, lines: '1000' },
    {
      skip: !appName || !envName || !jobComponentName || !scheduledJobName,
      pollingInterval,
    }
  );
  const [getLog] = radixApi.endpoints.jobLog.useLazyQuery();

  const { data: job, ...scheduledJobState } = useGetJobQuery(
    { appName, envName, jobComponentName, jobName: scheduledJobName },
    {
      skip: !appName || !envName || !jobComponentName || !scheduledJobName,
      pollingInterval: 5000,
    }
  );

  const sortedReplicas = useMemo(() => {
    return dataSorter(job?.replicaList, [
      (a, b) => sortCompareDate(a.created, b.created, 'descending'),
    ]);
  }, [job?.replicaList]);

  useEffect(() => {
    setPollingInterval(isJobSettled(job?.status) ? 0 : 5000);
  }, [job?.status]);

  const replica = sortedReplicas?.[0] ?? undefined;

  return (
    <main className="grid grid--gap-medium">
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          { label: 'Environments', to: getEnvsUrl(appName) },
          {
            label: envName,
            to: routeWithParams(routes.appEnvironment, { appName, envName }),
          },
          {
            label: jobComponentName,
            to: routeWithParams(routes.appActiveJobComponent, {
              appName,
              envName,
              jobComponentName,
            }),
          },
          { label: smallScheduledJobName(scheduledJobName) },
        ]}
      />

      <AsyncResource asyncState={scheduledJobState}>
        {job && (
          <>
            {replica && (
              <Replica
                logState={pollLogsState}
                replica={replica}
                downloadCb={downloadLazyLogCb(
                  `${replica.name}.txt`,
                  getLog,
                  {
                    appName,
                    envName,
                    jobComponentName,
                    scheduledJobName,
                    file: 'true',
                  },
                  false
                )}
                title={
                  <>
                    <Typography>
                      Name{' '}
                      <strong>{smallScheduledJobName(scheduledJobName)}</strong>
                    </Typography>
                    {job.jobId && (
                      <Typography>
                        Job ID <strong>{job.jobId}</strong>
                      </Typography>
                    )}
                    <Typography>
                      Job <strong>{jobComponentName}</strong>
                    </Typography>
                  </>
                }
                duration={<ScheduleJobDuration job={job} />}
                status={<ProgressStatusBadge status={job.status} />}
                state={
                  <ScheduledJobState
                    status={job.status}
                    replicaList={sortedReplicas}
                    message={job.message}
                  />
                }
                resources={
                  <>
                    <ReplicaResources resources={job.resources} />
                    <Typography>
                      Backoff Limit <strong>{job.backoffLimit}</strong>
                    </Typography>
                    <Typography>
                      Time Limit{' '}
                      <strong>
                        {!isNil(job.timeLimitSeconds) ? (
                          <Duration
                            start={0}
                            end={job.timeLimitSeconds * 1000}
                          />
                        ) : (
                          'Not set'
                        )}
                      </strong>
                    </Typography>
                  </>
                }
              />
            )}

            {(job.failedCount > 0 || pollLogsState.isError) && (
              <JobReplicaLogAccordion
                title="Job Logs History"
                appName={appName}
                envName={envName}
                jobComponentName={jobComponentName}
                jobName={scheduledJobName}
                start={job.started}
                end={job.ended}
              />
            )}
          </>
        )}
      </AsyncResource>
    </main>
  );
};

PageScheduledJob.propTypes = {
  appName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  scheduledJobName: PropTypes.string.isRequired,
};

export default withRouteParams(PageScheduledJob);
