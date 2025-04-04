import {
  Button,
  Checkbox,
  CircularProgress,
  Typography,
} from '@equinor/eds-core-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ComponentList } from './component-list';
import { StepsList } from './steps-list';

import { useInterval } from '../../effects/use-interval';
import { routes } from '../../routes';
import { pollingInterval } from '../../store/defaults';
import {
  type Job,
  radixApi,
  useGetApplicationJobQuery,
  useGetApplicationQuery,
} from '../../store/radix-api';
import {
  routeWithParams,
  smallDeploymentName,
  smallJobName,
} from '../../utils/string';
import AsyncResource from '../async-resource/async-resource';
import { Breadcrumb } from '../breadcrumb';
import { CommitHash } from '../commit-hash';
import { getJobExecutionState } from '../component/execution-state';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import { ScrimPopup } from '../scrim-popup';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';

import './style.css';

function getStopButtonText(status: Job['status']): string {
  switch (status) {
    case 'Queued':
    case 'Waiting':
      return 'Cancel';
    case 'Running':
    case 'Stopping':
      return 'Stop';
    default:
      return '';
  }
}

type Props = {
  appName: string;
  jobName: string;
};

export const JobOverview = ({ appName, jobName }: Props) => {
  const [now, setNow] = useState(new Date());
  const { data: application } = useGetApplicationQuery(
    { appName },
    { skip: !appName, pollingInterval }
  );
  const {
    data: job,
    refetch: refetchJob,
    ...jobState
  } = useGetApplicationJobQuery(
    { appName, jobName },
    { skip: !appName || !jobName, pollingInterval: 8000 }
  );
  const [stopJobTrigger, stopJobState] =
    radixApi.endpoints.stopApplicationJob.useMutation();
  const [rerunJobTrigger, rerunJobState] =
    radixApi.endpoints.rerunApplicationJob.useMutation();
  const [visibleRerunScrim, setVisibleRerunScrim] = useState<boolean>(false);

  const stopButtonText = getStopButtonText(job?.status);
  const isStopping = stopJobState.isLoading || job?.status === 'Stopping';
  const canBeRerun =
    !stopJobState.isLoading &&
    (job?.status === 'Failed' || job?.status === 'Stopped');
  const isRerunning = rerunJobState.isLoading;

  useInterval(() => setNow(new Date()), job?.ended ? 10000000 : 1000);

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
        <AsyncResource asyncState={jobState}>
          {!job ? (
            <Typography variant="h4">No job…</Typography>
          ) : (
            <>
              {(isStopping || !!stopButtonText) && (
                <div>
                  {!!stopButtonText && (
                    <Button
                      onClick={handlePromiseWithToast(async () => {
                        await stopJobTrigger({ appName, jobName }).unwrap();
                        refetchJob();
                      }, 'Stopped')}
                      disabled={isStopping}
                    >
                      {stopButtonText}
                    </Button>
                  )}

                  {isStopping && (
                    <>
                      {' '}
                      <CircularProgress size={24} />
                    </>
                  )}
                </div>
              )}

              {canBeRerun && (
                <div>
                  <Button
                    onClick={() => setVisibleRerunScrim(true)}
                    disabled={isRerunning}
                  >
                    Rerun
                  </Button>
                  {isRerunning && (
                    <>
                      {' '}
                      <CircularProgress size={24} />
                    </>
                  )}

                  <ScrimPopup
                    title={'Rerun job'}
                    open={!!visibleRerunScrim}
                    onClose={() => setVisibleRerunScrim(false)}
                    isDismissable
                  >
                    <div className="grid grid--gap-medium grid--auto-columns rerun-job-content">
                      <div className="rerun-job-options">
                        <Typography>
                          Create new a job with the same attributes
                        </Typography>
                      </div>

                      <Button.Group>
                        <Button
                          disabled={isRerunning}
                          onClick={handlePromiseWithToast(
                            async () => {
                              setVisibleRerunScrim(false);
                              await rerunJobTrigger({
                                appName,
                                jobName,
                              }).unwrap();
                              refetchJob();
                            },
                            `Pipeline job '${smallJobName(
                              jobName
                            )}' was successfully rerun.`
                          )}
                        >
                          Rerun
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setVisibleRerunScrim(false)}
                        >
                          Cancel
                        </Button>
                      </Button.Group>
                    </div>
                  </ScrimPopup>
                </div>
              )}

              <section className="grid grid--gap-medium">
                <Typography variant="h4">Overview</Typography>
                <div className="grid grid--gap-medium grid--overview-columns">
                  <div className="grid grid--gap-medium">
                    <Typography>
                      Pipeline Job {job.status?.toLowerCase()};{' '}
                      {getJobExecutionState(job.status)} pipeline{' '}
                      <strong>{job.pipeline}</strong>
                    </Typography>
                    {job.rerunFromJob && (
                      <Typography>
                        Rerun from job{' '}
                        <Typography
                          as={Link}
                          to={routeWithParams(routes.appJob, {
                            appName: appName,
                            jobName: job.rerunFromJob,
                          })}
                          link
                          token={{ textDecoration: 'none' }}
                        >
                          {smallJobName(job.rerunFromJob)}
                        </Typography>
                      </Typography>
                    )}
                    {job.pipeline === 'promote' && (
                      <Typography>
                        Deployment{' '}
                        <Typography
                          as={Link}
                          to={routeWithParams(routes.appDeployment, {
                            appName,
                            deploymentName: job.promotedFromDeployment!,
                          })}
                          link
                        >
                          {smallDeploymentName(job.promotedFromDeployment!)}
                        </Typography>{' '}
                        <strong>promoted</strong> from{' '}
                        <Typography
                          as={Link}
                          to={routeWithParams(routes.appEnvironment, {
                            appName,
                            envName: job.promotedFromEnvironment!,
                          })}
                          link
                        >
                          {job.promotedFromEnvironment}
                        </Typography>{' '}
                        to{' '}
                        <Typography
                          as={Link}
                          to={routeWithParams(routes.appEnvironment, {
                            appName,
                            envName: job.promotedToEnvironment!,
                          })}
                          link
                        >
                          {job.promotedToEnvironment}
                        </Typography>
                      </Typography>
                    )}
                    {(job.pipeline === 'build-deploy' ||
                      job.pipeline === 'build') &&
                      typeof job.overrideUseBuildCache === 'boolean' && (
                        <Checkbox
                          label="Override use build cache"
                          name="overrideUseBuildCache"
                          checked={job.overrideUseBuildCache}
                          disabled={true}
                        />
                      )}
                    {job.pipeline === 'apply-config' && (
                      <Checkbox
                        label="Deploy external DNS-es"
                        name="deployExternalDNS"
                        checked={job.deployExternalDNS === true}
                        disabled={true}
                      />
                    )}
                    {job.branch && (
                      <div>
                        <Typography>
                          Branch <strong>{job.branch}</strong>
                        </Typography>
                      </div>
                    )}
                    {job.deployedToEnvironment && (
                      <div>
                        <Typography>
                          Environment{' '}
                          <Typography
                            as={Link}
                            to={routeWithParams(routes.appEnvironment, {
                              appName,
                              envName: job.deployedToEnvironment,
                            })}
                            link
                          >
                            {job.deployedToEnvironment}
                          </Typography>
                        </Typography>
                      </div>
                    )}
                    <Typography>
                      Triggered{' '}
                      {job.triggeredFromWebhook && (
                        <strong>from GitHub webhook</strong>
                      )}{' '}
                      by <strong>{job.triggeredBy || 'N/A'}</strong>
                      {job.commitID && (
                        <>
                          , commit{' '}
                          <CommitHash
                            commit={job.commitID}
                            repo={application?.registration?.repository}
                          />
                        </>
                      )}
                    </Typography>
                  </div>
                  {job.started && (
                    <div className="grid grid--gap-medium">
                      <Typography>
                        Deployment active since{' '}
                        <strong>
                          <RelativeToNow time={new Date(job.started)} />
                        </strong>
                      </Typography>
                      {job.ended ? (
                        <Typography>
                          Job took{' '}
                          <strong>
                            <Duration
                              start={new Date(job.started)}
                              end={new Date(job.ended)}
                            />
                          </strong>
                        </Typography>
                      ) : (
                        <Typography>
                          Duration so far is{' '}
                          <strong>
                            <Duration start={new Date(job.started)} end={now} />
                          </strong>
                        </Typography>
                      )}
                    </div>
                  )}
                </div>
              </section>

              <section className="grid grid--gap-medium">
                {(job.deployments || job.components) && (
                  <>
                    <Typography variant="h4">Artefacts</Typography>
                    <div className="grid grid--gap-medium">
                      {job.deployments?.map((deployment) => (
                        <Typography key={deployment.name}>
                          Deployment{' '}
                          <Typography
                            as={Link}
                            to={routeWithParams(routes.appDeployment, {
                              appName,
                              deploymentName: deployment.name,
                            })}
                            link
                          >
                            {smallDeploymentName(deployment.name)}
                          </Typography>{' '}
                          to{' '}
                          <Typography
                            as={Link}
                            to={routeWithParams(routes.appEnvironment, {
                              appName,
                              envName: deployment.environment,
                            })}
                            link
                          >
                            {deployment.environment}
                          </Typography>
                        </Typography>
                      ))}
                      {job.components && (
                        <ComponentList
                          appName={appName}
                          deployments={job.deployments ?? []}
                          repository={application?.registration?.repository}
                        />
                      )}
                    </div>
                  </>
                )}
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
