import { Accordion, Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import usePollLogs from './use-poll-logs';
import useSelectScheduledBatch from './use-select-scheduled-batch';

import ScheduledJobList from '../component/scheduled-job-list';
import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { Code } from '../code';
import { StatusBadge } from '../status-badge';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { routes } from '../../routes';
import { getEnvsUrl, mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallScheduledBatchName } from '../../utils/string';

import './style.css';
import { Replica } from '../replica';
import { useEffect, useState } from 'react';

const ScheduleBatchDuration = ({ scheduledBatch }) => {
  return (
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
  const [pollLogsState] = usePollLogs(
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
  const scheduledBatchStatus = scheduledBatch?.status || 'Unknown';
  const [replica, setReplica] = useState();
  useEffect(
    () => setReplica(scheduledBatch?.replica ? scheduledBatch.replica : null),
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

      <AsyncResource asyncState={scheduledBatchState}>
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
          isCollapsibleOverview={true}
          isCollapsibleLog={true}
        />
      </AsyncResource>
      {scheduledBatch?.jobList && (
        <div className="grid grid--gap-medium">
          <ScheduledJobList
            appName={appName}
            envName={envName}
            jobComponentName={jobComponentName}
            scheduledJobList={scheduledBatch.jobList}
          />
        </div>
      )}
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
