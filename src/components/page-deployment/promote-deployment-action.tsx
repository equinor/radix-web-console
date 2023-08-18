import { Button } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import {
  DeploymentModel,
  DeploymentModelValidationMap,
} from '../../models/radix-api/deployments/deployment';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

export interface PromoteDeploymentActionProps {
  appName: string;
  deploymentName: string;
  deployment: DeploymentModel;
}

export const PromoteDeploymentAction: FunctionComponent<
  PromoteDeploymentActionProps
> = ({ appName, deploymentName, deployment }) => (
  <div>
    <Link
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
    </Link>
  </div>
);

PromoteDeploymentAction.propTypes = {
  appName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
  deployment: PropTypes.shape(DeploymentModelValidationMap)
    .isRequired as PropTypes.Validator<DeploymentModel>,
};
