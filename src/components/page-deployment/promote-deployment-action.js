import deploymentModel from '../../models/deployment';
import PropTypes from 'prop-types';
import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import React from 'react';
import { Button } from '@equinor/eds-core-react';
import { NavLink } from 'react-router-dom';

const PromoteDeploymentAction = ({ appName, deploymentName, deployment }) => {
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
  deployment: PropTypes.exact(deploymentModel),
};

export default PromoteDeploymentAction;
