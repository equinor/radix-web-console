import { routeWithParams, smallDeploymentName } from '../../utils/string';
import routes from '../../routes';
import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumbs, Typography } from '@equinor/eds-core-react';
import { NavLink } from 'react-router-dom';

const DeploymentComponentBreadCrumb = ({
  appName,
  deploymentName,
  componentName,
}) => {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Breadcrumb>
        <NavLink to={routeWithParams(routes.app, { appName })}>
          <Typography link as="span">
            {appName}
          </Typography>
        </NavLink>
      </Breadcrumbs.Breadcrumb>
      <Breadcrumbs.Breadcrumb>
        <NavLink to={routeWithParams(routes.appDeployments, { appName })}>
          <Typography link as="span">
            Deployments
          </Typography>
        </NavLink>
      </Breadcrumbs.Breadcrumb>
      <Breadcrumbs.Breadcrumb>
        <NavLink
          to={routeWithParams(routes.appDeployment, {
            appName,
            deploymentName,
          })}
        >
          <Typography link as="span">
            {smallDeploymentName(deploymentName)}
          </Typography>
        </NavLink>
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
