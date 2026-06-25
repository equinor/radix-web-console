import { Typography } from '@equinor/eds-core-react'
import { Link } from 'react-router'
import { routes } from '../../router/routes'
import { routeWithParams, smallDeploymentName } from '../../utils/string'

interface DeploymentRefProps {
  appName: string
  deploymentName: string
}

export const DeploymentRef = ({ appName, deploymentName }: DeploymentRefProps) => {
  const deploymentLink = routeWithParams(routes.appDeployment, {
    appName,
    deploymentName,
  })

  return (
    <Typography>
      Deployment{' '}
      <Typography
        className="deployment-summary__link"
        as={Link}
        to={deploymentLink}
        link={deploymentName.length > 0}
        token={{ textDecoration: 'none' }}
      >
        {smallDeploymentName(deploymentName)}
      </Typography>
    </Typography>
  )
}
