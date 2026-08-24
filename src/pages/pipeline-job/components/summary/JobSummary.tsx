import { Checkbox, Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { CommitHash } from '../../../../components/commit-hash'
import { getJobExecutionState } from '../../../../components/component/execution-state'
import { Duration } from '../../../../components/time/duration'
import { RelativeToNow } from '../../../../components/time/relative-to-now'
import { useInterval } from '../../../../hooks/use-interval'
import { routes } from '../../../../router/routes'
import type { Job } from '../../../../store/radix-api'
import { routeWithParams, smallDeploymentName, smallJobName } from '../../../../utils/string'
import { getBuildCacheStatus } from '../pipeline-job.utils'

const ENDED_INTERVAL_MS = 10000000
const RUNNING_INTERVAL_MS = 1000

type Props = {
  appName: string
  job: Job
  repository?: string
}

export const JobSummary = (props: Props) => {
  const { appName, job, repository } = props
  const [now, setNow] = useState(new Date())
  useInterval(() => setNow(new Date()), job.ended ? ENDED_INTERVAL_MS : RUNNING_INTERVAL_MS)

  const buildCacheStatus = getBuildCacheStatus(job)
  const showsBuildCache = (job.pipeline === 'build-deploy' || job.pipeline === 'build') && buildCacheStatus.length > 0

  return (
    <section className="grid grid--gap-medium">
      <Typography variant="h4">Overview</Typography>
      <div className="grid grid--gap-medium grid--overview-columns">
        <div className="grid grid--gap-medium">
          <Typography>
            Pipeline Job {job.status?.toLowerCase()}; {getJobExecutionState(job.status)} pipeline{' '}
            <strong>{job.pipeline}</strong>
          </Typography>
          {job.rerunFromJob && (
            <Typography>
              Rerun from job{' '}
              <Typography
                as={Link}
                to={routeWithParams(routes.appJob, { appName, jobName: job.rerunFromJob })}
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
          {job.pipeline === 'apply-config' && (
            <Checkbox
              label="Deploy external DNS-es"
              name="deployExternalDNS"
              checked={job.deployExternalDNS === true}
              disabled={true}
            />
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
            Triggered {job.triggeredFromWebhook && <strong>from GitHub webhook</strong>} by{' '}
            <strong>{job.triggeredBy || 'N/A'}</strong>
          </Typography>
          {showsBuildCache && (
            <Typography>
              Build Cache <strong>{buildCacheStatus}</strong>
            </Typography>
          )}
          {(job.gitRef || job.branch || job.commitID) && (
            <Typography>
              Built from{' '}
              {(job.gitRef || job.branch) && (
                <>
                  {job.gitRefType ?? 'branch'} <strong>{job.gitRef ?? job.branch}</strong>
                </>
              )}
              {job.commitID && (
                <>
                  {' commit '}
                  <CommitHash commit={job.commitID} repo={repository} />
                </>
              )}
            </Typography>
          )}
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
                  <Duration start={new Date(job.started)} end={new Date(job.ended)} />
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
  )
}
