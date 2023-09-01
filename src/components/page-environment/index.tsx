import { FunctionComponent } from 'react';

import EnvironmentOverview from './environment-overview';

import { DocumentTitle } from '../document-title';
import { connectRouteParams, routeParamLoader } from '../../utils/router';

export const PageEnvironment: FunctionComponent<{
  appName: string;
  envName: string;
}> = ({ appName, envName }) => (
  <>
    <DocumentTitle title={`${envName} environment`} />
    <EnvironmentOverview {...{ appName, envName }} />
  </>
);

const Component = connectRouteParams(PageEnvironment);
export { Component, routeParamLoader as loader };
