import { Route } from 'react-router';
import React from 'react';

import ActiveComponentOverview from './active-component-overview';

import DocumentTitle from '../document-title';
import PageReplica from '../page-replica';
import PageSecret from '../page-secret';

import { mapRouteParamsToProps } from '../../utils/routing';
import routes from '../../routes';
import PageAuxiliaryReplica from '../page-auxiliary-replica';

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
    <Route path={routes.appReplica} component={PageReplica} />
    <Route path={routes.appAuxiliaryReplica} component={PageAuxiliaryReplica} />
    <Route path={routes.appSecret} component={PageSecret} />
  </React.Fragment>
);

export default mapRouteParamsToProps(
  ['appName', 'envName', 'componentName'],
  PageActiveComponent
);
