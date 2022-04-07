import { Route } from 'react-router';

import ActiveComponentOverview from './active-component-overview';

import { DocumentTitle } from '../document-title';
import PageReplica from '../page-replica';
import PageSecret from '../page-secret';

import { mapRouteParamsToProps } from '../../utils/routing';
import { routes } from '../../routes';
import PageOAuthAuxiliaryReplica from '../page-oauth-replica';

export const PageActiveComponent = ({
  appName,
  envName,
  componentName,
}: {
  appName: string;
  envName: string;
  componentName: string;
}): JSX.Element => (
  <>
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
    <Route
      path={routes.appOAuthAuxiliaryReplica}
      component={PageOAuthAuxiliaryReplica}
    />
    <Route path={routes.appSecret} component={PageSecret} />
  </>
);

export default mapRouteParamsToProps(
  ['appName', 'envName', 'componentName'],
  PageActiveComponent
);
