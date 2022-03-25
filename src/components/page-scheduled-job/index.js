import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { usePollJobLogs } from './use-poll-job-logs';
import { useSelectScheduledJob } from './use-select-scheduled-job';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { Code } from '../code';
import { Replica } from '../replica';
import { StatusBadge } from '../status-badge';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { routes } from '../../routes';
import { getEnvsUrl, mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallScheduledJobName } from '../../utils/string';

import './style.css';

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
      scheduledJob.replicaList[0]?.status === 'Failing' && (
        <Typography>
          Error <strong>{scheduledJob.replicaList[0].statusMessage}</strong>
        </Typography>
      )}
    {scheduledJob?.message && <Code>{scheduledJob.message}</Code>}
  </>
);

const PageScheduledJob = (props) => {
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
  const scheduledJob = scheduledJobState?.data;
  const scheduledJobStatus = scheduledJob?.status || 'Unknown';

  const [replica, setReplica] = useState({});
  useEffect(
    () =>
      setReplica(
        scheduledJob?.replicaList?.length > 0 && scheduledJob.replicaList[0]
      ),
    [scheduledJob]
  );

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
          { label: smallScheduledJobName(scheduledJobName) },
        ]}
      />

      <AsyncResource asyncState={scheduledJobState}>
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
          duration={<ScheduleJobDuration scheduledJob={scheduledJob} />}
          status={
            <StatusBadge type={scheduledJobStatus}>
              {scheduledJobStatus}
            </StatusBadge>
          }
          state={
            <ScheduledJobState
              scheduledJobStatus={scheduledJobStatus}
              scheduledJob={scheduledJob}
            />
          }
        />
      </AsyncResource>
    </>
  );
};

PageScheduledJob.propTypes = {
  appName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string,
  envName: PropTypes.string.isRequired,
  scheduledJobName: PropTypes.string.isRequired,
};

export default mapRouteParamsToProps(
  ['appName', 'envName', 'jobComponentName', 'scheduledJobName'],
  PageScheduledJob
);
