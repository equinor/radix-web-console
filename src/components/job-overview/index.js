import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useStopJob from './use-stop-job';
import usePollJob from './use-poll-job';
import StepsList from './steps-list';

import ActionsPage from '../actions-page';
import AsyncResource from '../async-resource/simple-async-resource';
import Button from '../button';
import Breadcrumb from '../breadcrumb';
import CommitHash from '../commit-hash';
import Duration from '../time/duration';
import RelativeToNow from '../time/relative-to-now';
import Spinner from '../spinner';

import jobStatuses from '../../state/applications/job-statuses';
import requestStates from '../../state/state-utils/request-states';
import useGetApplication from '../page-application/use-get-application';
import useInterval from '../../effects/use-interval';
import {
  routeWithParams,
  smallDeploymentName,
  smallJobName,
} from '../../utils/string';
import routes from '../../routes';

import './style.css';

const getExecutionState = (status) => {
  if (status === jobStatuses.PENDING) {
    return 'will execute';
  }

  if (status === jobStatuses.RUNNING) {
    return 'executing';
  }

  if (
    status === jobStatuses.FAILED ||
    status === jobStatuses.SUCCEEDED ||
    status === jobStatuses.STOPPED
  ) {
    return 'executed';
  }

  return '';
};

const JobOverview = (props) => {
  const { appName, jobName } = props;

  // hooks
  const [getApplication] = useGetApplication(appName);
  const [pollJobState, pollJob] = usePollJob(appName, jobName);
  const [stopJobState, stopJobFunc, stopJobResetState] = useStopJob(
    appName,
    jobName
  );
  const [now, setNow] = useState(new Date());

  const job = pollJobState.data;
  const repo = getApplication.data
    ? getApplication.data.registration.repository
    : null;

  useInterval(() => setNow(new Date()), job && job.ended ? 10000000 : 1000);

  if (stopJobState.status === requestStates.SUCCESS) {
    pollJob();
    stopJobResetState();
  }

  return (
    <React.Fragment>
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          { label: 'Jobs', to: routeWithParams(routes.appJobs, { appName }) },
          { label: smallJobName(jobName) },
        ]}
      />
      <main>
        <AsyncResource asyncState={pollJobState}>
          {!job && 'No job…'}
          {job && (
            <React.Fragment>
              <ActionsPage>
                <Button
                  disabled={
                    getExecutionState(job.status) === 'executed' ||
                    job.status === jobStatuses.STOPPING
                  }
                  onClick={() => stopJobFunc()}
                >
                  Stop
                </Button>
                {(stopJobState.status === requestStates.IN_PROGRESS ||
                  job.status === jobStatuses.STOPPING) && <Spinner />}
              </ActionsPage>
              <div className="o-layout-columns">
                <section>
                  <h2 className="o-heading-section">Summary</h2>
                  <p>
                    Job {job.status.toLowerCase()};{' '}
                    {getExecutionState(job.status)} pipeline{' '}
                    <strong>{job.pipeline}</strong>
                  </p>
                  <p>
                    Triggered by{' '}
                    <strong>{job.triggeredBy ? job.triggeredBy : 'N/A'}</strong>
                    , commit <CommitHash commit={job.commitID} repo={repo} />
                  </p>
                  {job.started && (
                    <p>
                      Started{' '}
                      <strong>
                        <RelativeToNow time={job.started} />
                      </strong>
                    </p>
                  )}
                  {job.started && job.ended && (
                    <p>
                      Job took{' '}
                      <strong>
                        <Duration start={job.started} end={job.ended} />
                      </strong>
                    </p>
                  )}
                  {!job.ended && job.started && (
                    <p>
                      Duration so far is{' '}
                      <strong>
                        <Duration start={job.started} end={now} />
                      </strong>
                    </p>
                  )}
                </section>
                <section>
                  <h2 className="o-heading-section">Artefacts</h2>
                  {job.deployments &&
                    job.deployments.map((deployment) => (
                      <p key={deployment.name}>
                        Deployment{' '}
                        <Link
                          to={routeWithParams(routes.appDeployment, {
                            appName,
                            deploymentName: deployment.name,
                          })}
                        >
                          {smallDeploymentName(deployment.name)}
                        </Link>{' '}
                        to{' '}
                        <Link
                          to={routeWithParams(routes.appEnvironment, {
                            appName,
                            envName: deployment.environment,
                          })}
                        >
                          {deployment.environment}
                        </Link>
                      </p>
                    ))}
                  {job.components &&
                    job.components.map((component) => (
                      <p key={component.name}>
                        Component <strong>{component.name}</strong>
                      </p>
                    ))}
                </section>
              </div>
              {job.steps && (
                <StepsList
                  appName={appName}
                  jobName={jobName}
                  steps={job.steps}
                />
              )}
            </React.Fragment>
          )}
        </AsyncResource>
      </main>
    </React.Fragment>
  );
};

JobOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
};

export default JobOverview;
