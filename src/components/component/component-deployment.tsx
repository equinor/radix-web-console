import { Typography } from '@equinor/eds-core-react'
import { Link } from 'react-router-dom'
import { routes } from '../../routes'
import { useGetDeploymentQuery } from '../../store/radix-api'
import { routeWithParams, smallDeploymentName } from '../../utils/string'
import { ComponentDeploymentGitHubAttributes } from './component-deployment-github-attributes'

interface ComponentDeploymentProps {
  appName: string
  deploymentName: string
  componentName: string
}

export const ComponentDeployment = ({ appName, deploymentName, componentName }: ComponentDeploymentProps) => {
  const { data: deployment } = useGetDeploymentQuery({
    appName,
    deploymentName,
  })
  const deployComponent = deployment?.components?.find((component) => component.name === componentName)
  const deploymentLink = routeWithParams(routes.appDeployment, {
    appName,
    deploymentName,
  })

  return (
    <>
      <Typography>
        Deployment{' '}
        <Typography
          className="deployment-summary__link"
          as={Link}
          to={deploymentLink}
          link
          token={{ textDecoration: 'none' }}
        >
          {smallDeploymentName(deploymentName)}
        </Typography>
      </Typography>
      <ComponentDeploymentGitHubAttributes deployComponent={deployComponent} deployment={deployment} />
    </>
  )
}
