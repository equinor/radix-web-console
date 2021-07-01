import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import * as routing from '../../utils/routing';
import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumbs } from '@equinor/eds-core-react';

const ComponentBreadCrumb = ({ appName, envName, componentName }) => {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Breadcrumb href={routeWithParams(routes.app, { appName })}>
        {appName}
      </Breadcrumbs.Breadcrumb>
      <Breadcrumbs.Breadcrumb href={routing.getEnvsUrl(appName)}>
        Environments
      </Breadcrumbs.Breadcrumb>
      <Breadcrumbs.Breadcrumb
        href={routeWithParams(routes.appEnvironment, {
          appName,
          envName,
        })}
      >
        {envName}
      </Breadcrumbs.Breadcrumb>
      <Breadcrumbs.Breadcrumb>{componentName}</Breadcrumbs.Breadcrumb>
    </Breadcrumbs>
  );
};

ComponentBreadCrumb.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
};

export default ComponentBreadCrumb;
