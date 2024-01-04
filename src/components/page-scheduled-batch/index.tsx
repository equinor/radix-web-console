import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useState } from 'react';

import AsyncResource from '../async-resource/another-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { Code } from '../code';
import { downloadLazyLogCb } from '../code/log-helper';
import { ScheduledJobList } from '../component/scheduled-job/scheduled-job-list';
import { Replica } from '../replica';
import { ProgressStatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { routes } from '../../routes';
import {
  ReplicaSummary,
  ScheduledBatchSummary,
  radixApi,
  useGetBatchQuery,
  useJobLogQuery,
} from '../../store/radix-api';
import { connectRouteParams, routeParamLoader } from '../../utils/router';
import { getEnvsUrl } from '../../utils/routing';
import { routeWithParams, smallScheduledBatchName } from '../../utils/string';

import './style.css';

const ScheduleBatchDuration: FunctionComponent<
  Pick<ScheduledBatchSummary, 'created' | 'started' | 'ended'>
> = ({ created, ended, started }) => (
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
  </>
);

const ScheduledBatchState: FunctionComponent<
  Pick<ScheduledBatchSummary, 'message' | 'status' | 'replica'>
> = ({ message, status, replica }) => (
  <>
    {status === 'Failed' && replica?.replicaStatus?.status === 'Failing' && (
      <Typography>
        Error <strong>{replica.statusMessage}</strong>
      </Typography>
    )}
    {message && <Code>{message}</Code>}
  </>
);

export const PageScheduledBatch: FunctionComponent<{
  appName: string;
  envName: string;
  jobComponentName: string;
  scheduledBatchName: string;
}> = ({ appName, envName, jobComponentName, scheduledBatchName }) => {
  const [pollingInterval, setPollingInterval] = useState(5000);
  const pollLogsState = useJobLogQuery(
    {
      appName,
      envName,
      jobComponentName,
      scheduledJobName: scheduledBatchName,
      lines: '1000',
    },
    {
      skip: !appName || !envName || !jobComponentName || !scheduledBatchName,
      pollingInterval,
    }
  );
  const [getLog] = radixApi.endpoints.jobLog.useLazyQuery();

  const { data: batch, ...scheduledBatchState } = useGetBatchQuery(
    { appName, envName, jobComponentName, batchName: scheduledBatchName },
    {
      skip: !appName || !envName || !jobComponentName || !scheduledBatchName,
      pollingInterval: 5000,
    }
  );

  const [replica, setReplica] = useState<ReplicaSummary>();
  useEffect(() => {
    if (batch?.replica) {
      setReplica(batch.replica);
    }

    setPollingInterval(batch?.status === 'Running' ? 5000 : 0);
  }, [batch]);

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
          { label: smallScheduledBatchName(scheduledBatchName) },
        ]}
      />

      <AsyncResource asyncState={scheduledBatchState}>
        {batch && replica && (
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
                scheduledJobName: scheduledBatchName,
                file: 'true',
              },
              false
            )}
            title={
              <Typography>
                Batch{' '}
                <strong>{smallScheduledBatchName(scheduledBatchName)}</strong>,
                <strong>{jobComponentName}</strong>
              </Typography>
            }
            duration={<ScheduleBatchDuration {...batch} />}
            status={<ProgressStatusBadge status={batch.status} />}
            state={<ScheduledBatchState {...batch} />}
            isCollapsibleOverview
            isCollapsibleLog
          />
        )}
      </AsyncResource>

      {batch?.jobList && (
        <div className="grid grid--gap-medium">
          <ScheduledJobList
            appName={appName}
            envName={envName}
            jobComponentName={jobComponentName}
            scheduledJobList={batch.jobList}
            totalJobCount={batch.totalJobCount}
          />
        </div>
      )}
    </main>
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
