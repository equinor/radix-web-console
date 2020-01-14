import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useStopJob from './use-stop-job';
import usePollJob from './use-poll-job';
import StepsList from './steps-list';

import ActionsPage from '../actions-page';
import Button from '../button';
import Breadcrumb from '../breadcrumb';
import CommitHash from '../commit-hash';
import Duration from '../time/duration';
import RelativeToNow from '../time/relative-to-now';
import AsyncResource from '../async-resource/simple-async-resource';

import usePollApplication from '../page-application/use-poll-application';
import useInterval from '../../effects/use-interval';
import {
  routeWithParams,
  smallDeploymentName,
  smallJobName,
} from '../../utils/string';
import routes from '../../routes';

import './style.css';

const getExecutionState = status => {
  if (status === 'Pending') {
    return 'will execute';
  }

  if (status === 'Running') {
    return 'executing';
  }

  if (status === 'Failed' || status === 'Succeeded' || status === 'Stopped') {
    return 'executed';
  }

  return '';
};

const JobOverview = props => {
  const { appName, jobName } = props;

  const [pollApplication] = usePollApplication(appName);
  const [pollJobState] = usePollJob(appName, jobName);
  const [stopJobState, resetStopJobState, stopJobFunc] = useStopJob(
    appName,
    jobName
  );
  const job = pollJobState.data;
  const repo = pollApplication.data
    ? pollApplication.data.registration.repository
    : null;

  const [now, setNow] = useState(new Date());
  useInterval(() => setNow(new Date()), job && job.ended ? null : 1000);

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
                  disabled={getExecutionState(job.status) === 'executed'}
                  onClick={() => stopJobFunc()}
                >
                  Stop job
                </Button>
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
                    Triggered by <strong>User Name</strong>, commit{' '}
                    <CommitHash commit={job.commitID} repo={repo} />
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
                    job.deployments.map(deployment => (
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
                    job.components.map(component => (
                      <p key={component.name}>
                        Component <strong>{component.name}</strong>
                      </p>
                    ))}
                </section>
              </div>
              <StepsList
                appName={appName}
                jobName={jobName}
                steps={job.steps}
              />
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
