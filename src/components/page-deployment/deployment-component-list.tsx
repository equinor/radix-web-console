import { List, Typography } from '@equinor/eds-core-react'
import { Link } from 'react-router-dom'
import { routes } from '../../routes'
import type { Component, Deployment } from '../../store/radix-api'
import { routeWithParams } from '../../utils/string'
import { GitCommitTags } from '../component/git-commit-tags'
import { DockerImage } from '../docker-image'

type Props = {
  appName: string
  deployment: Deployment
  components?: Array<Component>
}

export const DeploymentComponentList = ({ appName, deployment, components }: Props) => (
  <>
    {components && (
      <>
        <Typography variant="h4">Components</Typography>
        <List className="o-indent-list">
          {components.map((component) => (
            <List.Item key={component.name}>
              <Typography
                as={Link}
                to={routeWithParams(routes.appComponent, {
                  appName,
                  deploymentName: deployment.name,
                  componentName: component.name,
                })}
                link
              >
                {component.name}
              </Typography>{' '}
              image <DockerImage path={component.image} />
              {(component.skipDeployment || component.commitID !== deployment.gitCommitHash) && (
                <>
                  <> from past deployment</>
                  <GitCommitTags
                    commitID={component.commitID}
                    gitTags={component.gitTags}
                    repository={deployment.repository}
                  />
                </>
              )}
            </List.Item>
          ))}
        </List>
      </>
    )}
  </>
)
