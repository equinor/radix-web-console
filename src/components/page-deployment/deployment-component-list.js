import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import DockerImage from '../docker-image';
import { ComponentModelValidationMap } from '../../models/component';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

export const DeploymentComponentList = ({
  appName,
  deploymentName,
  components,
}) => (
  <>
    {components && (
      <>
        <Typography variant="h4">Components</Typography>
        {components.map((component) => (
          <Typography key={component.name}>
            <NavLink
              to={routeWithParams(routes.appComponent, {
                appName,
                deploymentName,
                componentName: component.name,
              })}
            >
              <Typography link as="span">
                {component.name}
              </Typography>
            </NavLink>{' '}
            image <DockerImage path={component.image} />
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
};

export default DeploymentComponentList;
