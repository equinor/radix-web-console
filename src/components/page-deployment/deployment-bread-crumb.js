import { routeWithParams, smallDeploymentName } from '../../utils/string';
import routes from '../../routes';
import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumbs } from '@equinor/eds-core-react';

const DeploymentBreadCrumb = ({ appName, deploymentName }) => {
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
      <Breadcrumbs.Breadcrumb>
        {smallDeploymentName(deploymentName)}
      </Breadcrumbs.Breadcrumb>
    </Breadcrumbs>
  );
};

DeploymentBreadCrumb.propTypes = {
  appName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
};

export default DeploymentBreadCrumb;
