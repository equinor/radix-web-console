import { Button } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../breadcrumb';

import { ComponentList } from './component-list';
import usePollJob from './use-poll-job';
import useStopJob from './use-stop-job';
import StepsList from './steps-list';
import ActionsPage from '../actions-page';
import AsyncResource from '../async-resource/simple-async-resource';
import CommitHash from '../commit-hash';
import useGetApplication from '../page-application/use-get-application';
import Spinner from '../spinner';
import Duration from '../time/duration';
import RelativeToNow from '../time/relative-to-now';
import useInterval from '../../effects/use-interval';
import routes from '../../routes';
import jobStatuses from '../../state/applications/job-statuses';
import requestStates from '../../state/state-utils/request-states';
import {
  routeWithParams,
  smallDeploymentName,
  smallJobName,
} from '../../utils/string';

import './style.css';

const getExecutionState = (status) => {
  switch (status) {
    case jobStatuses.PENDING:
      return 'will execute';
    case jobStatuses.RUNNING:
      return 'executing';
    case jobStatuses.FAILED:
    case jobStatuses.SUCCEEDED:
    case jobStatuses.STOPPED:
      return 'executed';
    default:
      return '';
  }
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
    <>
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          {
            label: 'Pipeline Jobs',
            to: routeWithParams(routes.appJobs, { appName }),
          },
          { label: smallJobName(jobName) },
        ]}
      />
      <main>
        <AsyncResource asyncState={pollJobState}>
          {!job ? (
            'No job…'
          ) : (
            <React.Fragment>
              <ActionsPage>
                <Button
                  className="job-overview__btn job-overview__btn-stop"
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
              <div className="job-overview__overview">
                <h4>Overview</h4>
                <div className="job-overview__overview-content">
                  <span>
                    <p>
                      Pipeline Job {job.status.toLowerCase()};{' '}
                      {getExecutionState(job.status)} pipeline{' '}
                      <strong>{job.pipeline}</strong>
                    </p>
                    <p>
                      Triggered by{' '}
                      <strong>
                        {job.triggeredBy ? job.triggeredBy : 'N/A'}
                      </strong>
                      {job.commitID && (
                        <>
                          , commit{' '}
                          <CommitHash
                            commit={job.commitID ? job.commitID : ''}
                            repo={repo}
                          />
                        </>
                      )}
                    </p>
                  </span>
                  {job.started && (
                    <span>
                      <p>
                        Deployment active since{' '}
                        <strong>
                          <RelativeToNow time={job.started} />
                        </strong>
                      </p>
                      {job.ended ? (
                        <p>
                          Job took{' '}
                          <strong>
                            <Duration start={job.started} end={job.ended} />
                          </strong>
                        </p>
                      ) : (
                        <p>
                          Duration so far is{' '}
                          <strong>
                            <Duration start={job.started} end={now} />
                          </strong>
                        </p>
                      )}
                    </span>
                  )}
                </div>
              </div>
              <div className="job-overview__artefacts">
                {(job.deployments || job.components) && <h4>Artefacts</h4>}
                <div className="job-overview__artefacts-content">
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
                  {job.components && (
                    <ComponentList components={job.components}></ComponentList>
                  )}
                </div>
              </div>
              <div className="job-overview__stepslist">
                {job.steps && (
                  <StepsList
                    appName={appName}
                    jobName={jobName}
                    steps={job.steps}
                  />
                )}
              </div>
            </React.Fragment>
          )}
        </AsyncResource>
      </main>
    </>
  );
};

JobOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
};

export default JobOverview;
