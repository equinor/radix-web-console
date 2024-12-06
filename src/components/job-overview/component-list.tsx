import { List, Typography } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import type { DeploymentSummary } from '../../store/radix-api';
import { routeWithParams } from '../../utils/string';
import { GitCommitTags } from '../component/git-commit-tags';
import { DockerImage } from '../docker-image';

type Props = {
  appName: string;
  deployments: DeploymentSummary[];
  repository?: string;
};

export const ComponentList = ({ appName, deployments, repository }: Props) => {
  return (
    <>
      {deployments.some(
        (value) => value.components && value.components.length > 0
      ) && (
        <>
          <Typography variant="h4">Components</Typography>
          <List>
            {deployments.map((deployment) => (
              <List.Item key={deployment.name}>
                <Typography>
                  Environment <strong>{deployment.environment}</strong>
                </Typography>
                <>
                  {deployment.components ? (
                    <List className="o-indent-list">
                      {deployment.components.map((component) => (
                        <List.Item key={`${deployment.name}-${component.name}`}>
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
                          {' image '}
                          <DockerImage path={component.image} />
                          {(component.skipDeployment ||
                            component.commitID !==
                              deployment.gitCommitHash) && (
                            <>
                              <> from past deployment</>
                              <GitCommitTags
                                commitID={component.commitID}
                                gitTags={component.gitTags}
                                repository={repository}
                              />
                            </>
                          )}
                        </List.Item>
                      ))}
                    </List>
                  ) : (
                    <>No components</>
                  )}
                </>
              </List.Item>
            ))}
          </List>
        </>
      )}
    </>
  );
};
