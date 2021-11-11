import * as PropTypes from 'prop-types';

import { Breadcrumb } from '../breadcrumb';
import { routes } from '../../routes';
import { routeWithParams, smallDeploymentName } from '../../utils/string';

const DeploymentBreadCrumb = ({ appName, deploymentName }) => (
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

DeploymentBreadCrumb.propTypes = {
  appName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
};

export default DeploymentBreadCrumb;
