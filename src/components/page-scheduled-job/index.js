import { Typography } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';

import usePollLogs from './use-poll-logs';
import useSelectScheduledJob from './use-select-scheduled-job';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { Code } from '../code';
import useGetEnvironment from '../page-environment/use-get-environment';
import { StatusBadge } from '../status-badge';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { routes } from '../../routes';
import { getEnvsUrl, mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallScheduledJobName } from '../../utils/string';

import './style.css';

const PageScheduledJob = (props) => {
  const { appName, envName, jobComponentName, scheduledJobName } = props;

  const [getEnvironmentState] = useGetEnvironment(appName, envName);
  const [pollLogsState] = usePollLogs(
    appName,
    envName,
    jobComponentName,
    scheduledJobName
  );
  const scheduledJob = useSelectScheduledJob(
    getEnvironmentState.data,
    jobComponentName,
    scheduledJobName
  );
  const scheduledJobStatus = scheduledJob?.status || 'Unknown';
  const scheduledJobLog = pollLogsState && pollLogsState.data;

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
      <AsyncResource asyncState={getEnvironmentState}>
        <section className="grid grid--gap-medium">
          <Typography variant="h4">Overview</Typography>
          <div className="grid grid--gap-medium grid--overview-columns">
            <div className="grid grid--gap-medium">
              <Typography>
                Scheduled job{' '}
                <strong>{smallScheduledJobName(scheduledJobName)}</strong>, job{' '}
                <strong>{jobComponentName}</strong>
              </Typography>
              <StatusBadge type={scheduledJobStatus}>
                {scheduledJobStatus}
              </StatusBadge>
              {scheduledJobStatus === 'Failed' &&
                scheduledJob?.replicaList?.length > 0 &&
                scheduledJob.replicaList[0]?.replicaStatus?.status ===
                  'Failing' && (
                  <Typography>
                    Error{' '}
                    <strong>
                      {scheduledJob.replicaList[0]?.statusMessage}
                    </strong>
                  </Typography>
                )}
            </div>
            {scheduledJob && (
              <div className="grid grid--gap-medium">
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
              </div>
            )}
          </div>
        </section>
        <section className="scheduled-job__log grid grid--gap-medium">
          <Typography variant="h4">Log</Typography>
          {scheduledJobLog ? (
            <AsyncResource asyncState={pollLogsState}>
              <Code copy download filename={`${scheduledJobName}`}>
                {scheduledJobLog}
              </Code>
            </AsyncResource>
          ) : (
            <Typography>This scheduled job has no log</Typography>
          )}
        </section>
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
