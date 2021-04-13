import Breadcrumb from '../breadcrumb';
import { routeWithParams, smallDeploymentName } from '../../utils/string';
import routes from '../../routes';
import React from 'react';
import PropTypes from 'prop-types';

const DeploymentComponentBreadCrumb = ({
  appName,
  deploymentName,
  componentName,
}) => {
  return (
    <Breadcrumb
      links={[
        { label: appName, to: routeWithParams(routes.app, { appName }) },
        {
          label: 'Deployments',
          to: routeWithParams(routes.appDeployments, { appName }),
        },
        {
          label: smallDeploymentName(deploymentName),
          to: routeWithParams(routes.appDeployment, {
            appName,
            deploymentName,
          }),
        },
        {
          label: componentName,
        },
      ]}
    />
  );
};

DeploymentComponentBreadCrumb.propTypes = {
  appName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
};

export default DeploymentComponentBreadCrumb;
