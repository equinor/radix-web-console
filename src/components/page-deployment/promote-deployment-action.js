import deploymentModel from '../../models/deployment';
import PropTypes from 'prop-types';
import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import React from 'react';
import { Button } from '@equinor/eds-core-react';

const PromoteDeploymentAction = ({ appName, deploymentName, deployment }) => {
  return (
    <div>
      <Button
        href={routeWithParams(
          routes.appJobNew,
          { appName },
          {
            pipeline: 'promote',
            deploymentName: deploymentName,
            fromEnvironment: deployment.environment,
          }
        )}
        className="button"
      >
        Promote deployment
      </Button>
    </div>
  );
};

PromoteDeploymentAction.propTypes = {
  appName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
  deployment: PropTypes.exact(deploymentModel),
};

export default PromoteDeploymentAction;
