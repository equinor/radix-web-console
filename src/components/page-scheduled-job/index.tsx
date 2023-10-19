import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useState } from 'react';

import { JobReplicaLogAccordion } from './replica-log-accordion';
import { useGetFullJobLogs } from './use-get-job-full-logs';
import { usePollJobLogs } from './use-poll-job-logs';
import { useSelectScheduledJob } from './use-select-scheduled-job';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { Code } from '../code';
import { LogDownloadOverrideType } from '../component/log';
import { Replica } from '../replica';
import { ReplicaResources } from '../replica-resources';
import { ProgressStatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { JobSchedulerProgressStatus } from '../../models/radix-api/deployments/job-scheduler-progress-status';
import { ReplicaStatus } from '../../models/radix-api/deployments/replica-status';
import { ReplicaSummaryNormalizedModel } from '../../models/radix-api/deployments/replica-summary';
import { ScheduledJobSummaryModel } from '../../models/radix-api/deployments/scheduled-job-summary';
import { routes } from '../../routes';
import { RequestState } from '../../state/state-utils/request-states';
import { isNullOrUndefined } from '../../utils/object';
import { connectRouteParams, routeParamLoader } from '../../utils/router';
import { getEnvsUrl } from '../../utils/routing';
import { sortCompareDate, sortDirection } from '../../utils/sort-utils';
import {
  pluraliser,
  routeWithParams,
  smallScheduledJobName,
} from '../../utils/string';

import './style.css';

export interface PageScheduledJobProps {
  appName: string;
  jobComponentName: string;
  envName: string;
  scheduledJobName: string;
}

const timesPluraliser = pluraliser('time', 'times');

const ScheduleJobDuration: FunctionComponent<{
  job: ScheduledJobSummaryModel;
}> = ({ job: { created, started, ended, failedCount } }) => (
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
);

function useSortReplicasByCreated(
  source: Array<ReplicaSummaryNormalizedModel>,
  direction: sortDirection = 'descending'
): Array<ReplicaSummaryNormalizedModel> {
  const [list, setList] = useState<Array<ReplicaSummaryNormalizedModel>>([]);
  useEffect(() => {
    setList(
      [...(source || [])].sort((a, b) =>
        sortCompareDate(a.created, b.created, direction)
      )
    );
  }, [direction, source]);

  return list;
}

const ScheduledJobState: FunctionComponent<
  Pick<ScheduledJobSummaryModel, 'message' | 'status' | 'replicaList'>
> = ({ message, replicaList, status }) => (
  <>
    {status === JobSchedulerProgressStatus.Failed &&
      replicaList[0]?.status === ReplicaStatus.Failing && (
        <Typography>
          Error <strong>{replicaList[0].statusMessage}</strong>
        </Typography>
      )}

    {message && <Code>{message}</Code>}
  </>
);

export const PageScheduledJob: FunctionComponent<PageScheduledJobProps> = ({
  appName,
  envName,
  jobComponentName,
  scheduledJobName,
}) => {
  const [pollLogsInterval, setPollLogsInterval] = useState(5000);
  const [pollLogsState] = usePollJobLogs(
    appName,
    envName,
    jobComponentName,
    scheduledJobName,
    pollLogsInterval
  );
  const [getFullLogsState, downloadFullLog] = useGetFullJobLogs(
    appName,
    envName,
    jobComponentName,
    scheduledJobName
  );
  const [{ data: job, ...scheduledJobState }] = useSelectScheduledJob(
    appName,
    envName,
    jobComponentName,
    scheduledJobName
  );

  const [replica, setReplica] = useState<ReplicaSummaryNormalizedModel>();
  const [pollJobLogFailed, setPollJobLogFailed] = useState(false);
  const sortedReplicas = useSortReplicasByCreated(job?.replicaList);

  const downloadOverride: LogDownloadOverrideType = {
    status: getFullLogsState.status,
    content: getFullLogsState.data,
    onDownload: () => downloadFullLog(),
    error: getFullLogsState.error,
  };

  useEffect(() => {
    switch (job?.status) {
      case JobSchedulerProgressStatus.Failed:
      case JobSchedulerProgressStatus.Succeeded:
      case JobSchedulerProgressStatus.Stopped:
        setPollLogsInterval(0);
        break;
    }
  }, [job]);

  useEffect(() => {
    if (sortedReplicas.length > 0) {
      setReplica(sortedReplicas[0]);
    }
  }, [sortedReplicas]);

  useEffect(() => {
    switch (pollLogsState.status) {
      case RequestState.FAILURE:
      case RequestState.SUCCESS:
        setPollJobLogFailed(pollLogsState.status === RequestState.FAILURE);
        break;
    }
  }, [pollLogsState]);

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
          <Replica
            logState={pollLogsState}
            replica={replica}
            downloadOverride={downloadOverride}
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
              <ScheduledJobState {...{ ...job, replicaList: sortedReplicas }} />
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
                    {!isNullOrUndefined(job.timeLimitSeconds) ? (
                      <Duration start={0} end={job.timeLimitSeconds * 1000} />
                    ) : (
                      'Not set'
                    )}
                  </strong>
                </Typography>
              </>
            }
          />
        )}
      </AsyncResource>

      {(job?.failedCount > 0 || pollJobLogFailed) && (
        <JobReplicaLogAccordion
          title="Job Logs History"
          appName={appName}
          envName={envName}
          jobComponentName={jobComponentName}
          jobName={scheduledJobName}
          {...(job && { timeSpan: { start: job.started, end: job.ended } })}
        />
      )}
    </main>
  );
};

PageScheduledJob.propTypes = {
  appName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  scheduledJobName: PropTypes.string.isRequired,
};

const Component = connectRouteParams(PageScheduledJob);
export { Component, routeParamLoader as loader };
