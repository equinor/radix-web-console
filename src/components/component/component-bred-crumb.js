import Breadcrumb from '../breadcrumb';
import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import * as routing from '../../utils/routing';
import EnvironmentBadge from '../environment-badge';
import React from 'react';
import PropTypes from 'prop-types';

const ComponentBredcrumb = ({ appName, envName, componentName }) => {
  return (
    <Breadcrumb
      links={[
        { label: appName, to: routeWithParams(routes.app, { appName }) },
        { label: 'Environments', to: routing.getEnvsUrl(appName) },
        {
          label: <EnvironmentBadge envName={envName} />,
          to: routeWithParams(routes.appEnvironment, {
            appName,
            envName,
          }),
        },
        { label: componentName },
      ]}
    />
  );
};

ComponentBredcrumb.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
};

export default ComponentBredcrumb;
