import { Typography } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';

import { routes } from '../../routes';
import {
  type ScheduledBatchSummary,
  radixApi,
  useGetBatchQuery,
  useJobLogQuery,
} from '../../store/radix-api';
import { withRouteParams } from '../../utils/router';
import { getEnvsUrl } from '../../utils/routing';
import { routeWithParams, smallScheduledBatchName } from '../../utils/string';
import AsyncResource from '../async-resource/async-resource';
import { Breadcrumb } from '../breadcrumb';
import { Code } from '../code';
import { downloadLog } from '../code/log-helper';
import { ScheduledJobList } from '../component/scheduled-job/scheduled-job-list';
import { Replica } from '../replica';
import { ProgressStatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';

import './style.css';
import { ScheduledBatchOverview } from './scheduled-batch-overview';

type ScheduleBatchDurationProps = {
  created?: string;
  started?: string;
  ended?: string;
};

function ScheduleBatchDuration({
  created,
  started,
  ended,
}: ScheduleBatchDurationProps) {
  return (
    <>
      {created && (
        <Typography>
          Created{' '}
          <strong>
            <RelativeToNow time={new Date(created)} />
          </strong>
        </Typography>
      )}
      {started && (
        <Typography>
          Started{' '}
          <strong>
            <RelativeToNow time={new Date(started)} />
          </strong>
        </Typography>
      )}
      {ended && started && (
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
}

function ScheduledBatchState({ batch }: { batch: ScheduledBatchSummary }) {
  return (
    <>
      {batch.status === 'Failed' &&
        (batch.replica?.replicaStatus?.status === 'Failed' ||
          batch.replica?.replicaStatus?.status === 'Failing') && (
          <Typography>
            Error <strong>{batch.replica.statusMessage}</strong>
          </Typography>
        )}
      {batch.message && <Code>{batch.message}</Code>}
    </>
  );
}

type Props = {
  appName: string;
  envName: string;
  jobComponentName: string;
  scheduledBatchName: string;
};
export function PageScheduledBatch({
  appName,
  envName,
  jobComponentName,
  scheduledBatchName,
}: Props) {
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

  const replica = batch?.replica;
  useEffect(() => {
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
          { label: `batch ${smallScheduledBatchName(scheduledBatchName)}` },
        ]}
      />

      <AsyncResource asyncState={scheduledBatchState}>
        {batch && (
          <ScheduledBatchOverview
            batch={batch}
            jobComponentName={jobComponentName}
          />
        )}
        {batch && replica && (
          <Replica
            logState={pollLogsState}
            replica={replica}
            downloadCb={() =>
              downloadLog(`${replica.name}.txt`, () =>
                getLog(
                  {
                    appName,
                    envName,
                    jobComponentName,
                    scheduledJobName: scheduledBatchName,
                    file: 'true',
                  },
                  false
                ).unwrap()
              )
            }
            title={
              <Typography>
                Batch{' '}
                <strong>{smallScheduledBatchName(scheduledBatchName)}</strong>,
                <strong>{jobComponentName}</strong>
              </Typography>
            }
            duration={
              <ScheduleBatchDuration
                created={batch.created}
                started={batch.started}
                ended={batch.ended}
              />
            }
            status={<ProgressStatusBadge status={batch.status} />}
            state={<ScheduledBatchState batch={batch} />}
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
            isExpanded={true}
            batchName={batch.name}
          />
        </div>
      )}
    </main>
  );
}

export default withRouteParams(PageScheduledBatch);
