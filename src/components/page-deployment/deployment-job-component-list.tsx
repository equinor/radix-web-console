import { Typography } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import type { Component, Deployment } from '../../store/radix-api';
import { routeWithParams } from '../../utils/string';
import { GitCommitTags } from '../component/git-commit-tags';
import { DockerImage } from '../docker-image';

type Props = {
  appName: string;
  deploymentName: string;
  components?: Array<Component>;
  deployment?: Deployment;
};

export const DeploymentJobComponentList = ({
  appName,
  components,
  deployment,
}: Props) => (
  <>
    {components && (
      <>
        <Typography variant="h4">Jobs</Typography>
        {components.map((component) => (
          <Typography key={component.name}>
            <Typography
              as={Link}
              to={routeWithParams(routes.appJobComponent, {
                appName,
                deploymentName: deployment?.name ?? '',
                jobComponentName: component.name,
              })}
              link
            >
              {component.name}
            </Typography>{' '}
            image <DockerImage path={component.image} />
            {(component.skipDeployment ||
              component.commitID !== deployment?.gitCommitHash) && (
              <>
                <> from past deployment</>
                <GitCommitTags
                  commitID={component.commitID}
                  gitTags={component.gitTags}
                  repository={deployment?.repository}
                />
              </>
            )}
          </Typography>
        ))}
      </>
    )}
  </>
);
