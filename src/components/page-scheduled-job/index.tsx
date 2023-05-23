import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { useGetFullJobLogs } from './use-get-job-full-logs';
import { usePollJobLogs } from './use-poll-job-logs';
import { useSelectScheduledJob } from './use-select-scheduled-job';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { Code } from '../code';
import { LogDownloadOverrideType } from '../component/log';
import { Replica } from '../replica';
import { ReplicaResources } from '../replica-resources';
import { StatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { ProgressStatus } from '../../models/progress-status';
import { ReplicaStatus } from '../../models/replica-status';
import { ReplicaSummaryNormalizedModel } from '../../models/replica-summary';
import { ScheduledJobSummaryModel } from '../../models/scheduled-job-summary';
import { routes } from '../../routes';
import { isNullOrUndefined } from '../../utils/object';
import { getEnvsUrl, mapRouteParamsToProps } from '../../utils/routing';
import { sortCompareDate } from '../../utils/sort-utils';
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

const ScheduleJobDuration = ({ job }: { job: ScheduledJobSummaryModel }) => (
  <>
    {job && (
      <>
        <Typography>
          Created{' '}
          <strong>
            <RelativeToNow time={job.created} />
          </strong>
        </Typography>
        <Typography>
          Started{' '}
          <strong>
            <RelativeToNow time={job.started} />
          </strong>
        </Typography>
        {job.ended && (
          <>
            <Typography>
              Ended{' '}
              <strong>
                <RelativeToNow time={job.ended} />
              </strong>
            </Typography>
            <Typography>
              Duration{' '}
              <strong>
                <Duration start={job.started} end={job.ended} />
              </strong>
            </Typography>
          </>
        )}
        {job.failedCount > 0 && (
          <Typography>
            Failed <strong>{timesPluraliser(job.failedCount)}</strong>
          </Typography>
        )}
      </>
    )}
  </>
);

function useSortReplicaListByCreatedDescending(
  source?: Array<ReplicaSummaryNormalizedModel>
): Array<ReplicaSummaryNormalizedModel> {
  const [sortedReplicaList, setSortedReplicaList] = useState<
    Array<ReplicaSummaryNormalizedModel>
  >([]);

  useEffect(() => {
    setSortedReplicaList(
      (source ?? []).sort((a, b) =>
        sortCompareDate(a.created, b.created, 'descending')
      )
    );
  }, [source]);

  return sortedReplicaList;
}

const ScheduledJobState = ({
  job,
}: {
  job: ScheduledJobSummaryModel;
}): JSX.Element => {
  const sortedReplicaList = useSortReplicaListByCreatedDescending(
    job.replicaList
  );

  return (
    <>
      {job.status === ProgressStatus.Failed &&
        sortedReplicaList[0]?.status === ReplicaStatus.Failing && (
          <Typography>
            Error <strong>{sortedReplicaList[0].statusMessage}</strong>
          </Typography>
        )}
      {job?.message && <Code>{job.message}</Code>}
    </>
  );
};

export const PageScheduledJob = (props: PageScheduledJobProps): JSX.Element => {
  const { appName, envName, jobComponentName, scheduledJobName } = props;
  const [pollLogsState] = usePollJobLogs(
    appName,
    envName,
    jobComponentName,
    scheduledJobName
  );
  const [getFullLogsState, downloadFullLog] = useGetFullJobLogs(
    appName,
    envName,
    jobComponentName,
    scheduledJobName
  );
  const [scheduledJobState] = useSelectScheduledJob(
    appName,
    envName,
    jobComponentName,
    scheduledJobName
  );
  const downloadOverride: LogDownloadOverrideType = {
    status: getFullLogsState.status,
    content: getFullLogsState.data,
    onDownload: () => downloadFullLog(),
    error: getFullLogsState.error,
  };

  const scheduledJob = scheduledJobState.data;
  const sortedReplicaList = useSortReplicaListByCreatedDescending(
    scheduledJob?.replicaList
  );

  const [replica, setReplica] = useState<ReplicaSummaryNormalizedModel>();
  useEffect(() => {
    if (sortedReplicaList.length > 0) {
      setReplica(sortedReplicaList[0]);
    }
  }, [sortedReplicaList]);

  return (
    <>
      <Breadcrumb
        links={[
          {
            label: appName,
            to: routeWithParams(routes.app, { appName: appName }),
          },
          { label: 'Environments', to: getEnvsUrl(appName) },
          {
            label: envName,
            to: routeWithParams(routes.appEnvironment, {
              appName: appName,
              envName: envName,
            }),
          },
          {
            label: jobComponentName,
            to: routeWithParams(routes.appActiveJobComponent, {
              appName: appName,
              envName: envName,
              jobComponentName: jobComponentName,
            }),
          },
          { label: smallScheduledJobName(scheduledJobName) },
        ]}
      />

      <AsyncResource asyncState={scheduledJobState}>
        {scheduledJob && (
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
                {scheduledJob.jobId && (
                  <Typography>
                    Job ID <strong>{scheduledJob.jobId}</strong>
                  </Typography>
                )}
                <Typography>
                  Job <strong>{jobComponentName}</strong>
                </Typography>
              </>
            }
            duration={<ScheduleJobDuration job={scheduledJob} />}
            status={
              <StatusBadge type={scheduledJob.status}>
                {scheduledJob.status}
              </StatusBadge>
            }
            state={<ScheduledJobState job={scheduledJob} />}
            resources={
              <>
                <ReplicaResources resources={scheduledJob.resources} />
                <Typography>
                  Backoff Limit <strong>{scheduledJob.backoffLimit}</strong>
                </Typography>
                <Typography>
                  Time Limit{' '}
                  <strong>
                    {!isNullOrUndefined(scheduledJob.timeLimitSeconds) ? (
                      <Duration
                        start={0}
                        end={scheduledJob.timeLimitSeconds * 1000}
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
      </AsyncResource>
    </>
  );
};

PageScheduledJob.propTypes = {
  appName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  scheduledJobName: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<PageScheduledJobProps>;

export default mapRouteParamsToProps(
  ['appName', 'envName', 'jobComponentName', 'scheduledJobName'],
  PageScheduledJob
);
