import { Button } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  DeploymentModel,
  DeploymentModelValidationMap,
} from '../../models/deployment';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

export interface PromoteDeploymentActionProps {
  appName: string;
  deploymentName: string;
  deployment: DeploymentModel;
}

export const PromoteDeploymentAction = ({
  appName,
  deploymentName,
  deployment,
}: PromoteDeploymentActionProps): JSX.Element => (
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
  deployment: PropTypes.shape(DeploymentModelValidationMap).isRequired,
} as PropTypes.ValidationMap<PromoteDeploymentActionProps>;
