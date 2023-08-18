import { FunctionComponent } from 'react';

import EnvironmentOverview from './environment-overview';

import { DocumentTitle } from '../document-title';
import { mapRouteParamsToProps } from '../../utils/routing';

export const PageEnvironment: FunctionComponent<{
  appName: string;
  envName: string;
}> = ({ appName, envName }) => (
  <>
    <DocumentTitle title={`${envName} environment`} />
    <EnvironmentOverview appName={appName} envName={envName} />
  </>
);

export default mapRouteParamsToProps(['appName', 'envName'], PageEnvironment);
