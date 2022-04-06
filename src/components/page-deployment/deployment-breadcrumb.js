import * as PropTypes from 'prop-types';

import { Breadcrumb } from '../breadcrumb';
import { routes } from '../../routes';
import { routeWithParams, smallDeploymentName } from '../../utils/string';

export const DeploymentBreadcrumb = ({ appName, deploymentName }) => (
  <Breadcrumb
    links={[
      { label: appName, to: routeWithParams(routes.app, { appName }) },
      {
        label: 'Deployments',
        to: routeWithParams(routes.appDeployments, { appName }),
      },
      { label: smallDeploymentName(deploymentName) },
    ]}
  />
);

DeploymentBreadcrumb.propTypes = {
  appName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
};
