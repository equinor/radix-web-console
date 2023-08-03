import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { DockerImage } from '../docker-image';
import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../../models/radix-api/deployments/component';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

export interface DeploymentComponentListProps {
  appName: string;
  deploymentName: string;
  components?: Array<ComponentModel>;
}

export const DeploymentComponentList = ({
  appName,
  deploymentName,
  components,
}: DeploymentComponentListProps): React.JSX.Element => (
  <>
    {components && (
      <>
        <Typography variant="h4">Components</Typography>
        {components.map(({ image, name }) => (
          <Typography key={name}>
            <Link
              to={routeWithParams(routes.appComponent, {
                appName,
                deploymentName,
                componentName: name,
              })}
            >
              <Typography link as="span">
                {name}
              </Typography>
            </Link>{' '}
            image <DockerImage path={image} />
          </Typography>
        ))}
      </>
    )}
  </>
);

DeploymentComponentList.propTypes = {
  appName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
  components: PropTypes.arrayOf(PropTypes.shape(ComponentModelValidationMap)),
} as PropTypes.ValidationMap<DeploymentComponentListProps>;
