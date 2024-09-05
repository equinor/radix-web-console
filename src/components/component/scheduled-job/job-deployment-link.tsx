import { Typography } from '@equinor/eds-core-react'
import * as PropTypes from 'prop-types'
import type { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import { routes } from '../../../routes'
import { getAppDeploymentUrl } from '../../../utils/routing'
import { routeWithParams } from '../../../utils/string'

export interface ScheduledJobListProps {
  appName: string
  jobComponentName: string
  deploymentName: string
}

export const JobDeploymentLink: FunctionComponent<ScheduledJobListProps> = ({
  appName,
  jobComponentName,
  deploymentName,
}) => (
  <Typography>
    Job{' '}
    <Typography
      as={Link}
      to={routeWithParams(routes.appJobComponent, {
        appName: appName,
        deploymentName: deploymentName,
        jobComponentName: jobComponentName,
      })}
      link
    >
      {jobComponentName}
    </Typography>{' '}
    in deployment{' '}
    <Typography
      as={Link}
      to={getAppDeploymentUrl(appName, deploymentName)}
      link
    >
      {deploymentName}
    </Typography>
  </Typography>
)

JobDeploymentLink.propTypes = {
  appName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
}
