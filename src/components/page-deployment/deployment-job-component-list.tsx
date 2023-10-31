import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { DockerImage } from '../docker-image';
import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../../models/radix-api/deployments/component';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

export interface DeploymentJobComponentListProps {
  appName: string;
  deploymentName: string;
  components?: Array<ComponentModel>;
}

export const DeploymentJobComponentList: FunctionComponent<
  DeploymentJobComponentListProps
> = ({ appName, deploymentName, components }) => (
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
    PropTypes.shape(
      ComponentModelValidationMap
    ) as PropTypes.Validator<ComponentModel>
  ),
};
