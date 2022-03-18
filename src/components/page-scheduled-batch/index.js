import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import usePollLogs from './use-poll-logs';
import useSelectScheduledBatch from './use-select-scheduled-batch';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { Code } from '../code';
import useGetEnvironment from '../page-environment/use-get-environment';
import { StatusBadge } from '../status-badge';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { routes } from '../../routes';
import { getEnvsUrl, mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallScheduledBatchName } from '../../utils/string';

import './style.css';
import { Replica } from '../replica';
import { useEffect, useState } from 'react';

const ScheduleJobDuration = ({ scheduledJob }) => {
  return (
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
};

const ScheduledBatchState = ({ scheduledBatchStatus, scheduledBatch }) => {
  return (
    <>
      {scheduledBatchStatus === 'Failed' &&
        scheduledBatch?.replica?.status === 'Failing' && (
          <Typography>
            Error <strong>{scheduledBatch.replica?.statusMessage}</strong>
          </Typography>
        )}
      {scheduledBatch?.message && <Code>{scheduledBatch.message}</Code>}
    </>
  );
};

const PageScheduledBatch = (props) => {
  const { appName, envName, jobComponentName, scheduledBatchName } = props;

  const [environmentState] = useGetEnvironment(appName, envName);
  const [pollLogsState] = usePollLogs(
    appName,
    envName,
    jobComponentName,
    scheduledBatchName
  );
  const scheduledBatch = useSelectScheduledBatch(
    environmentState.data,
    jobComponentName,
    scheduledBatchName
  );
  const scheduledBatchStatus = scheduledBatch?.status || 'Unknown';
  const [replica, setReplica] = useState();
  useEffect(
    () =>
      setReplica(
        scheduledBatch?.replica !== null ? scheduledBatch.replica : null
      ),
    [scheduledBatch]
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
          { label: smallScheduledBatchName(scheduledBatchName) },
        ]}
      />

      <AsyncResource asyncState={environmentState}>
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
          duration={<ScheduleJobDuration scheduledJob={scheduledBatch} />}
          status={
            <StatusBadge type={scheduledBatchStatus}>
              {scheduledBatchStatus}
            </StatusBadge>
          }
          state={
            <ScheduledBatchState
              scheduledBatchStatus={scheduledBatchStatus}
              scheduledBatch={scheduledBatch}
            />
          }
        />
      </AsyncResource>
    </>
  );
};

PageScheduledBatch.propTypes = {
  appName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string,
  envName: PropTypes.string.isRequired,
  scheduledBatchName: PropTypes.string.isRequired,
};

export default mapRouteParamsToProps(
  ['appName', 'envName', 'jobComponentName', 'scheduledBatchName'],
  PageScheduledBatch
);
