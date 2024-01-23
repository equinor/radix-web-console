import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { DockerImage } from '../docker-image';
import { routes } from '../../routes';
import { Component } from '../../store/radix-api';
import { routeWithParams } from '../../utils/string';

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

DeploymentJobComponentList.propTypes = {
  appName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
  components: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<Component>
  ),
};
