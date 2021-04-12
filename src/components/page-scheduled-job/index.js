import React from 'react';
import PropTypes from 'prop-types';

import useGetEnvironment from '../page-environment/use-get-environment';
import usePollLogs from './use-poll-logs';
import useSelectScheduledJob from './use-select-scheduled-job';

import Breadcrumb from '../breadcrumb';
import Code from '../code';
import EnvironmentBadge from '../environment-badge';
import ScheduledJobStatus from '../scheduled-job-status';
import AsyncResource from '../async-resource/simple-async-resource';

import routes from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallScheduledJobName } from '../../utils/string';
import * as routing from '../../utils/routing';
import RelativeToNow from '../time/relative-to-now';
import Duration from '../time/duration';

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
  const scheduledJobStatus = scheduledJob ? scheduledJob.status : null;
  const scheduledJobLog = pollLogsState && pollLogsState.data;

  return (
    <React.Fragment>
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          { label: 'Environments', to: routing.getEnvsUrl(appName) },
          {
            label: <EnvironmentBadge envName={envName} />,
            to: routeWithParams(routes.appEnvironment, {
              appName,
              envName,
            }),
          },
          {
            to: routeWithParams(routes.appActiveJobComponent, {
              appName,
              envName,
              jobComponentName,
            }),
            label: jobComponentName,
          },
          { label: smallScheduledJobName(scheduledJobName) },
        ]}
      />
      <main>
        <AsyncResource asyncState={getEnvironmentState}>
          <React.Fragment>
            <div className="o-layout-columns">
              <section>
                <h2 className="o-heading-section">Overview</h2>
                <p>
                  Scheduled job{' '}
                  <strong>{smallScheduledJobName(scheduledJobName)}</strong>,
                  job <strong>{jobComponentName}</strong>
                </p>
                {scheduledJob && (
                  <div>
                    <p>
                      Created{' '}
                      <strong>
                        <RelativeToNow
                          time={scheduledJob.created}
                        ></RelativeToNow>
                      </strong>
                    </p>
                    <p>
                      Started{' '}
                      <strong>
                        <RelativeToNow
                          time={scheduledJob.started}
                        ></RelativeToNow>
                      </strong>
                    </p>
                    <p>
                      Ended{' '}
                      <strong>
                        <RelativeToNow
                          time={scheduledJob.ended}
                        ></RelativeToNow>
                      </strong>
                    </p>
                    <p>
                      Duration{' '}
                      <strong>
                        <Duration
                          start={scheduledJob.started}
                          end={scheduledJob.ended}
                        />
                      </strong>
                    </p>
                  </div>
                )}
                <p>
                  Status <ScheduledJobStatus status={scheduledJobStatus} />
                </p>
                {scheduledJobLog && (
                  <p>
                    <h2 className="o-heading-section">Log</h2>
                    <AsyncResource asyncState={pollLogsState}>
                      {scheduledJobLog && <Code copy>{scheduledJobLog}</Code>}
                    </AsyncResource>
                  </p>
                )}
                {!scheduledJobLog && <p>No logs</p>}
              </section>
            </div>
          </React.Fragment>
        </AsyncResource>
      </main>
    </React.Fragment>
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
