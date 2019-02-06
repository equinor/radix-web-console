import { Route } from 'react-router';
import React from 'react';

import ComponentOverview from './component-overview';

import DocumentTitle from '../document-title';

import { mapRouteParamsToProps } from '../../utils/routing';
import routes from '../../routes';

export const PageComponent = ({ appName, deploymentName, componentName }) => {
  return (
    <React.Fragment>
      <DocumentTitle title={`Component ${componentName}`} />
      <Route
        exact
        path={routes.appComponent2}
        render={() => (
          <ComponentOverview
            appName={appName}
            componentName={componentName}
            deploymentName={deploymentName}
          />
        )}
      />
      <Route path={routes.appComponent} component={PageComponent} />
    </React.Fragment>
  );
};

export default mapRouteParamsToProps(
  ['appName', 'deploymentName', 'componentName'],
  PageComponent
);
