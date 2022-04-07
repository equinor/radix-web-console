import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { usePollBatchLogs } from './use-poll-batch-logs';
import { useSelectScheduledBatch } from './use-select-scheduled-batch';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { Code } from '../code';
import { ScheduledJobList } from '../component/scheduled-job-list';
import { Replica } from '../replica';
import { StatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { ProgressStatus } from '../../models/progress-status';
import { ReplicaSummaryNormalizedModel } from '../../models/replica-summary';
import { ReplicaStatusEnum } from '../../models/replica-status-enum';
import { ScheduledBatchSummaryModel } from '../../models/scheduled-batch-summary';
import { routes } from '../../routes';
import { getEnvsUrl, mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallScheduledBatchName } from '../../utils/string';

import './style.css';

export interface PageScheduledBatchProps {
  appName: string;
  envName: string;
  jobComponentName: string;
  scheduledBatchName: string;
}

const ScheduleBatchDuration = ({
  batch,
}: {
  batch: ScheduledBatchSummaryModel;
}): JSX.Element => (
  <>
    <Typography>
      Created{' '}
      <strong>
        <RelativeToNow time={batch.created} />
      </strong>
    </Typography>
    <Typography>
      Started{' '}
      <strong>
        <RelativeToNow time={batch.started} />
      </strong>
    </Typography>
    {batch.ended && (
      <>
        <Typography>
          Ended{' '}
          <strong>
            <RelativeToNow time={batch.ended} />
          </strong>
        </Typography>
        <Typography>
          Duration{' '}
          <strong>
            <Duration start={batch.started} end={batch.ended} />
          </strong>
        </Typography>
      </>
    )}
  </>
);

const ScheduledBatchState = ({
  batch,
}: {
  batch: ScheduledBatchSummaryModel;
}): JSX.Element => (
  <>
    {batch.status === ProgressStatus.Failed &&
      batch.replica?.status === ReplicaStatusEnum.Failing && (
        <Typography>
          Error <strong>{batch.replica.statusMessage}</strong>
        </Typography>
      )}
    {batch.message && <Code>{batch.message}</Code>}
  </>
);

export const PageScheduledBatch = ({
  appName,
  envName,
  jobComponentName,
  scheduledBatchName,
}: PageScheduledBatchProps): JSX.Element => {
  const [pollLogsState] = usePollBatchLogs(
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

  const [replica, setReplica] = useState<ReplicaSummaryNormalizedModel>();
  useEffect(() => {
    if (scheduledBatchState.data?.replica) {
      setReplica(scheduledBatchState.data.replica);
    }
  }, [scheduledBatchState]);

  const scheduledBatch = scheduledBatchState.data;
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
            title={
              <Typography>
                Scheduled batch{' '}
                <strong>{smallScheduledBatchName(scheduledBatchName)}</strong>,
                <strong>{jobComponentName}</strong>
              </Typography>
            }
            duration={<ScheduleBatchDuration batch={scheduledBatch} />}
            status={
              <StatusBadge type={scheduledBatch.status}>
                {scheduledBatch.status}
              </StatusBadge>
            }
            state={<ScheduledBatchState batch={scheduledBatch} />}
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
} as PropTypes.ValidationMap<PageScheduledBatchProps>;

export default mapRouteParamsToProps(
  ['appName', 'envName', 'jobComponentName', 'scheduledBatchName'],
  PageScheduledBatch
);
