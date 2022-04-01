import { Button } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { DeploymentModelValidationMap } from '../../models/deployment';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

export const PromoteDeploymentAction = ({
  appName,
  deploymentName,
  deployment,
}) => {
  return (
    <div>
      <NavLink
        to={routeWithParams(
          routes.appJobNew,
          { appName },
          {
            pipeline: 'promote',
            deploymentName: deploymentName,
            fromEnvironment: deployment.environment,
          }
        )}
      >
        <Button as="span">Promote deployment</Button>
      </NavLink>
    </div>
  );
};

PromoteDeploymentAction.propTypes = {
  appName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
  deployment: PropTypes.shape(DeploymentModelValidationMap),
};

export default PromoteDeploymentAction;
