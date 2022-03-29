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
import { StatusBadge } from '../status-badge';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { ReplicaSummaryNormalizedModel } from '../../models/replica-summary';
import { routes } from '../../routes';
import { getEnvsUrl, mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallScheduledBatchName } from '../../utils/string';

import './style.css';
import { ScheduledBatchSummaryModel } from '../../models/scheduled-batch-summary';
import { ProgressStatus } from '../../models/progress-status';
import { ReplicaStatusEnum } from '../../models/replica-status-enum';

export interface PageScheduledBatchProps {
  appName: string;
  envName: string;
  jobComponentName: string;
  scheduledBatchName: string;
}

const ScheduleBatchDuration = ({
  scheduledBatch,
}: {
  scheduledBatch: ScheduledBatchSummaryModel;
}) => (
  <>
    {scheduledBatch && (
      <>
        <Typography>
          Created{' '}
          <strong>
            <RelativeToNow time={scheduledBatch.created} />
          </strong>
        </Typography>
        <Typography>
          Started{' '}
          <strong>
            <RelativeToNow time={scheduledBatch.started} />
          </strong>
        </Typography>
        {scheduledBatch.ended && (
          <>
            <Typography>
              Ended{' '}
              <strong>
                <RelativeToNow time={scheduledBatch.ended} />
              </strong>
            </Typography>
            <Typography>
              Duration{' '}
              <strong>
                <Duration
                  start={scheduledBatch.started}
                  end={scheduledBatch.ended}
                />
              </strong>
            </Typography>
          </>
        )}
      </>
    )}
  </>
);

const ScheduledBatchState = ({
  scheduledBatch,
}: {
  scheduledBatch: ScheduledBatchSummaryModel;
}) => (
  <>
    {scheduledBatch?.status === ProgressStatus.Failed &&
      scheduledBatch.replica?.status === ReplicaStatusEnum.Failing && (
        <Typography>
          Error <strong>{scheduledBatch.replica.statusMessage}</strong>
        </Typography>
      )}
    {scheduledBatch?.message && <Code>{scheduledBatch.message}</Code>}
  </>
);

export const PageScheduledBatch = (
  props: PageScheduledBatchProps
): JSX.Element => {
  const { appName, envName, jobComponentName, scheduledBatchName } = props;
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

  const scheduledBatch = scheduledBatchState?.data;
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
        {scheduledBatch && (
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
            duration={<ScheduleBatchDuration scheduledBatch={scheduledBatch} />}
            status={
              <StatusBadge type={scheduledBatch.status}>
                {scheduledBatch.status}
              </StatusBadge>
            }
            state={<ScheduledBatchState scheduledBatch={scheduledBatch} />}
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
