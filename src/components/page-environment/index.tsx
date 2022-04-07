import { Route } from 'react-router';

import EnvironmentOverview from './environment-overview';

import { DocumentTitle } from '../document-title';
import PageActiveComponent from '../page-active-component';
import PageActiveJobComponent from '../page-active-job-component';
import { routes } from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';

export const PageEnvironment = ({
  appName,
  envName,
}: {
  appName: string;
  envName: string;
}): JSX.Element => (
  <>
    <DocumentTitle title={`${envName} environment`} />
    <Route
      exact
      path={routes.appEnvironment}
      render={() => <EnvironmentOverview appName={appName} envName={envName} />}
    />
    <Route path={routes.appActiveComponent} component={PageActiveComponent} />
    <Route
      path={routes.appActiveJobComponent}
      component={PageActiveJobComponent}
    />
  </>
);

export default mapRouteParamsToProps(['appName', 'envName'], PageEnvironment);
