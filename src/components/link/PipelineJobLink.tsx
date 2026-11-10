import { Typography } from '@equinor/eds-core-react'
import { Link } from 'react-router'
import { routes } from '../../router/routes'
import type { JobSummary } from '../../store/radix-api'
import { routeWithParams, smallJobName } from '../../utils/string'

interface PipelineJobLinkProps {
  readonly appName: string
  readonly job: Pick<JobSummary, 'name'>
}

export const PipelineJobLink = (props: PipelineJobLinkProps) => {
  const { appName, job } = props

  return (
    <Typography as={Link} to={routeWithParams(routes.appJob, { appName, jobName: job.name })} link>
      {smallJobName(job.name)}
    </Typography>
  )
}
