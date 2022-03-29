import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { usePollJobLogs } from './use-poll-job-logs';
import { useSelectScheduledJob } from './use-select-scheduled-job';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { Code } from '../code';
import { ReplicaSummaryNormalizedModel } from '../../models/replica-summary';
import { Replica } from '../replica';
import { StatusBadge } from '../status-badge';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { routes } from '../../routes';
import { getEnvsUrl, mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallScheduledJobName } from '../../utils/string';

import './style.css';

export interface PageScheduledJobProps {
  appName: string;
  jobComponentName: string;
  envName: string;
  scheduledJobName: string;
}

const ScheduleJobDuration = ({ scheduledJob }) => (
  <>
    {scheduledJob && (
      <>
        <Typography>
          Created{' '}
          <strong>
            <RelativeToNow time={scheduledJob.created} />
          </strong>
        </Typography>
        <Typography>
          Started{' '}
          <strong>
            <RelativeToNow time={scheduledJob.started} />
          </strong>
        </Typography>
        {scheduledJob.ended && (
          <>
            <Typography>
              Ended{' '}
              <strong>
                <RelativeToNow time={scheduledJob.ended} />
              </strong>
            </Typography>
            <Typography>
              Duration{' '}
              <strong>
                <Duration
                  start={scheduledJob.started}
                  end={scheduledJob.ended}
                />
              </strong>
            </Typography>
          </>
        )}
      </>
    )}
  </>
);

const ScheduledJobState = ({ scheduledJobStatus, scheduledJob }) => (
  <>
    {scheduledJobStatus === 'Failed' &&
      scheduledJob?.replicaList?.length > 0 &&
      scheduledJob.replicaList[0].status === 'Failing' && (
        <Typography>
          Error <strong>{scheduledJob.replicaList[0].statusMessage}</strong>
        </Typography>
      )}
    {scheduledJob?.message && <Code>{scheduledJob.message}</Code>}
  </>
);

export const PageScheduledJob = (props: PageScheduledJobProps): JSX.Element => {
  const { appName, envName, jobComponentName, scheduledJobName } = props;
  const [pollLogsState] = usePollJobLogs(
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

  const [replica, setReplica] = useState<ReplicaSummaryNormalizedModel>();
  useEffect(() => {
    if (scheduledJobState.data?.replicaList?.length > 0) {
      setReplica(scheduledJobState.data.replicaList[0]);
    }
  }, [scheduledJobState.data]);

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
        {scheduledJobState.data && (
          <Replica
            logState={pollLogsState}
            replica={replica}
            title={
              <Typography>
                Scheduled job{' '}
                <strong>{smallScheduledJobName(scheduledJobName)}</strong>, job{' '}
                <strong>{jobComponentName}</strong>
              </Typography>
            }
            duration={
              <ScheduleJobDuration scheduledJob={scheduledJobState.data} />
            }
            status={
              <StatusBadge type={scheduledJobState.data.status}>
                {scheduledJobState.data.status}
              </StatusBadge>
            }
            state={
              <ScheduledJobState
                scheduledJobStatus={scheduledJobState.data.status}
                scheduledJob={scheduledJobState.data}
              />
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
