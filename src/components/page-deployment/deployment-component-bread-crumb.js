import { routeWithParams, smallDeploymentName } from '../../utils/string';
import routes from '../../routes';
import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumbs } from '@equinor/eds-core-react';

const DeploymentComponentBreadCrumb = ({
  appName,
  deploymentName,
  componentName,
}) => {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Breadcrumb href={routeWithParams(routes.app, { appName })}>
        {appName}
      </Breadcrumbs.Breadcrumb>
      <Breadcrumbs.Breadcrumb
        href={routeWithParams(routes.appDeployments, { appName })}
      >
        Deployments
      </Breadcrumbs.Breadcrumb>
      <Breadcrumbs.Breadcrumb
        href={routeWithParams(routes.appDeployment, {
          appName,
          deploymentName,
        })}
      >
        {smallDeploymentName(deploymentName)}
      </Breadcrumbs.Breadcrumb>
      <Breadcrumbs.Breadcrumb>{componentName}</Breadcrumbs.Breadcrumb>
    </Breadcrumbs>
  );
};

DeploymentComponentBreadCrumb.propTypes = {
  appName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
};

export default DeploymentComponentBreadCrumb;
