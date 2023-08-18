import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useState } from 'react';

import { useGetBatchFullLogs } from './use-get-batch-full-logs';
import { usePollBatchLogs } from './use-poll-batch-logs';
import { useSelectScheduledBatch } from './use-select-scheduled-batch';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { Code } from '../code';
import { LogDownloadOverrideType } from '../component/log';
import ScheduledJobList from '../component/scheduled-job/scheduled-job-list';
import { Replica } from '../replica';
import { ProgressStatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { JobSchedulerProgressStatus } from '../../models/radix-api/deployments/job-scheduler-progress-status';
import { ReplicaStatus } from '../../models/radix-api/deployments/replica-status';
import { ReplicaSummaryNormalizedModel } from '../../models/radix-api/deployments/replica-summary';
import { ScheduledBatchSummaryModel } from '../../models/radix-api/deployments/scheduled-batch-summary';
import { routes } from '../../routes';
import { connectRouteParams, routeParamLoader } from '../../utils/router';
import { getEnvsUrl } from '../../utils/routing';
import { routeWithParams, smallScheduledBatchName } from '../../utils/string';

import './style.css';

export interface PageScheduledBatchProps {
  appName: string;
  envName: string;
  jobComponentName: string;
  scheduledBatchName: string;
}

const ScheduleBatchDuration: FunctionComponent<
  Pick<ScheduledBatchSummaryModel, 'created' | 'started' | 'ended'>
> = ({ created, ended, started }) => (
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
  </>
);

const ScheduledBatchState: FunctionComponent<
  Pick<ScheduledBatchSummaryModel, 'message' | 'status' | 'replica'>
> = ({ message, status, replica }) => (
  <>
    {status === JobSchedulerProgressStatus.Failed &&
      replica?.status === ReplicaStatus.Failing && (
        <Typography>
          Error <strong>{replica.statusMessage}</strong>
        </Typography>
      )}
    {message && <Code>{message}</Code>}
  </>
);

export const PageScheduledBatch: FunctionComponent<PageScheduledBatchProps> = ({
  appName,
  envName,
  jobComponentName,
  scheduledBatchName,
}) => {
  const [pollLogsState] = usePollBatchLogs(
    appName,
    envName,
    jobComponentName,
    scheduledBatchName
  );
  const [getFullLogsState, downloadFullLog] = useGetBatchFullLogs(
    appName,
    envName,
    jobComponentName,
    scheduledBatchName
  );
  const [scheduledBatchState] = useSelectScheduledBatch(
    appName,
    envName,
    jobComponentName,
    scheduledBatchName
  );

  const scheduledBatch = scheduledBatchState.data;
  const downloadOverride: LogDownloadOverrideType = {
    status: getFullLogsState.status,
    content: getFullLogsState.data,
    onDownload: () => downloadFullLog(),
    error: getFullLogsState.error,
  };

  const [replica, setReplica] = useState<ReplicaSummaryNormalizedModel>();
  useEffect(() => {
    if (scheduledBatch?.replica) {
      setReplica(scheduledBatch.replica);
    }
  }, [scheduledBatch]);

  return (
    <>
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
          { label: smallScheduledBatchName(scheduledBatchName) },
        ]}
      />

      <AsyncResource asyncState={scheduledBatchState}>
        {scheduledBatch && replica && (
          <Replica
            logState={pollLogsState}
            replica={replica}
            downloadOverride={downloadOverride}
            title={
              <Typography>
                Batch{' '}
                <strong>{smallScheduledBatchName(scheduledBatchName)}</strong>,
                <strong>{jobComponentName}</strong>
              </Typography>
            }
            duration={<ScheduleBatchDuration {...scheduledBatch} />}
            status={<ProgressStatusBadge status={scheduledBatch.status} />}
            state={<ScheduledBatchState {...scheduledBatch} />}
            isCollapsibleOverview
            isCollapsibleLog
          />
        )}
      </AsyncResource>

      {scheduledBatch?.jobList && (
        <div className="grid grid--gap-medium">
          <ScheduledJobList
            appName={appName}
            envName={envName}
            jobComponentName={jobComponentName}
            scheduledJobList={scheduledBatch.jobList}
            totalJobCount={scheduledBatch.totalJobCount}
          />
        </div>
      )}
    </>
  );
};

PageScheduledBatch.propTypes = {
  appName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  scheduledBatchName: PropTypes.string.isRequired,
};

const Component = connectRouteParams(PageScheduledBatch);
export { Component, routeParamLoader as loader };
