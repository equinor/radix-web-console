import { Typography } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import type { Component } from '../../store/radix-api';
import { routeWithParams } from '../../utils/string';
import { DockerImage } from '../docker-image';

type Props = {
  appName: string;
  deploymentName: string;
  components?: Array<Component>;
};

export const DeploymentJobComponentList = ({
  appName,
  deploymentName,
  components,
}: Props) => (
  <>
    {components && (
      <>
        <Typography variant="h4">Jobs</Typography>
        {components.map(({ image, name }) => (
          <Typography key={name}>
            <Typography
              as={Link}
              to={routeWithParams(routes.appJobComponent, {
                appName,
                deploymentName,
                jobComponentName: name,
              })}
              link
            >
              {name}
            </Typography>{' '}
            image <DockerImage path={image} />
          </Typography>
        ))}
      </>
    )}
  </>
);
