import { Route } from 'react-router';
import React from 'react';

import ActiveComponentOverview from '../active-component-overview';
import DocumentTitle from '../document-title';

import { mapRouteParamsToProps } from '../../utils/routing';
import routes from '../../routes';

export const PageActiveComponent = ({ appName, envName, componentName }) => (
  <React.Fragment>
    <DocumentTitle title={`${componentName} in ${envName}`} />
    <Route
      exact
      path={routes.appActiveComponent}
      render={() => (
        <ActiveComponentOverview
          appName={appName}
          componentName={componentName}
          envName={envName}
        />
      )}
    />
  </React.Fragment>
);

export default mapRouteParamsToProps(
  ['appName', 'envName', 'componentName'],
  PageActiveComponent
);
