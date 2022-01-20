import { Button, CircularProgress, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ComponentList } from './component-list';
import { StepsList } from './steps-list';
import usePollJob from './use-poll-job';
import useStopJob from './use-stop-job';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { CommitHash } from '../commit-hash';
import useGetApplication from '../page-application/use-get-application';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { useInterval } from '../../effects/use-interval';
import { routes } from '../../routes';
import { ProgressStatus } from '../../models/progress-status';
import { RequestState } from '../../state/state-utils/request-states';
import {
  routeWithParams,
  smallDeploymentName,
  smallJobName,
} from '../../utils/string';

import './style.css';

const getExecutionState = (status) => {
  switch (status) {
    case ProgressStatus.Pending:
      return 'will execute';
    case ProgressStatus.Running:
      return 'executing';
    case ProgressStatus.Failed:
    case ProgressStatus.Succeeded:
    case ProgressStatus.Stopped:
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

  const job = props.job ?? pollJobState.data;
  const repo = getApplication.data?.registration.repository;

  useInterval(() => setNow(new Date()), job?.ended ? 10000000 : 1000);

  if (stopJobState.status === RequestState.SUCCESS) {
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
      <main className="grid grid--gap-large">
        <AsyncResource asyncState={props.pollJobState ?? pollJobState}>
          {!job ? (
            <Typography variant="h4">No job…</Typography>
          ) : (
            <>
              {!(
                getExecutionState(job.status) === 'executed' ||
                job.status === ProgressStatus.Stopping
              ) && (
                <div>
                  <Button onClick={() => stopJobFunc()}>
                    {job.status === ProgressStatus.Queued ? 'Cancel' : 'Stop'}
                  </Button>
                  {(stopJobState.status === RequestState.IN_PROGRESS ||
                    job.status === ProgressStatus.Stopping) && (
                    <>
                      {' '}
                      <CircularProgress size={24} />
                    </>
                  )}
                </div>
              )}
              <section className="grid grid--gap-medium">
                <Typography variant="h4">Overview</Typography>
                <div className="grid grid--gap-medium grid--overview-columns">
                  <div className="grid grid--gap-medium">
                    <Typography>
                      Pipeline Job {job.status.toLowerCase()};{' '}
                      {getExecutionState(job.status)} pipeline{' '}
                      <strong>{job.pipeline}</strong>
                    </Typography>
                    <Typography>
                      Triggered by <strong>{job.triggeredBy || 'N/A'}</strong>
                      {job.commitID && (
                        <>
                          , commit{' '}
                          <CommitHash commit={job.commitID} repo={repo} />
                        </>
                      )}
                    </Typography>
                  </div>
                  {job.started && (
                    <div className="grid grid--gap-medium">
                      <Typography>
                        Deployment active since{' '}
                        <strong>
                          <RelativeToNow time={job.started} />
                        </strong>
                      </Typography>
                      {job.ended ? (
                        <Typography>
                          Job took{' '}
                          <strong>
                            <Duration start={job.started} end={job.ended} />
                          </strong>
                        </Typography>
                      ) : (
                        <Typography>
                          Duration so far is{' '}
                          <strong>
                            <Duration start={job.started} end={now} />
                          </strong>
                        </Typography>
                      )}
                    </div>
                  )}
                </div>
              </section>
              <section className="grid grid--gap-medium">
                {(job.deployments || job.components) && (
                  <Typography variant="h4">Artefacts</Typography>
                )}
                <div className="grid grid--gap-medium">
                  {job.deployments?.map((deployment) => (
                    <Typography key={deployment.name}>
                      Deployment{' '}
                      <Link
                        to={routeWithParams(routes.appDeployment, {
                          appName,
                          deploymentName: deployment.name,
                        })}
                      >
                        <Typography link as="span">
                          {smallDeploymentName(deployment.name)}
                        </Typography>
                      </Link>{' '}
                      to{' '}
                      <Link
                        to={routeWithParams(routes.appEnvironment, {
                          appName,
                          envName: deployment.environment,
                        })}
                      >
                        <Typography link as="span">
                          {deployment.environment}
                        </Typography>
                      </Link>
                    </Typography>
                  ))}
                  {job.components && (
                    <ComponentList components={job.components} />
                  )}
                </div>
              </section>
              <section className="grid grid--gap-medium">
                {job.steps && (
                  <StepsList
                    appName={appName}
                    jobName={jobName}
                    steps={job.steps}
                  />
                )}
              </section>
            </>
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
