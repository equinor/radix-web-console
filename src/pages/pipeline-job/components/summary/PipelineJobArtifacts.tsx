import { Typography } from '@equinor/eds-core-react'
import { Link } from 'react-router'
import { routes } from '../../../../router/routes'
import type { Job } from '../../../../store/radix-api'
import { routeWithParams, smallDeploymentName } from '../../../../utils/string'
import { PipelineJobComponentList } from './PipelineJobComponentList'

interface PipelineJobArtifactsProps {
  readonly appName: string
  readonly job: Job
  readonly repository?: string
}

export const PipelineJobArtifacts = (props: PipelineJobArtifactsProps) => {
  const { appName, job, repository } = props

  if (!job.deployments && !job.components) {
    return null
  }

  return (
    <section className="grid grid--gap-medium">
      <Typography variant="h4">Artifacts</Typography>
      <div className="grid grid--gap-medium">
        {job.deployments?.map((deployment) => (
          <Typography key={deployment.name}>
            Deployment{' '}
            <Typography
              as={Link}
              to={routeWithParams(routes.appDeployment, { appName, deploymentName: deployment.name })}
              link
            >
              {smallDeploymentName(deployment.name)}
            </Typography>{' '}
            to{' '}
            <Typography
              as={Link}
              to={routeWithParams(routes.appEnvironment, { appName, envName: deployment.environment })}
              link
            >
              {deployment.environment}
            </Typography>
          </Typography>
        ))}
        {job.components && (
          <PipelineJobComponentList appName={appName} deployments={job.deployments ?? []} repository={repository} />
        )}
      </div>
    </section>
  )
}
