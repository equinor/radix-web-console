import { FunctionComponent } from 'react';

import { ActiveComponentOverview } from './active-component-overview';

import { DocumentTitle } from '../document-title';
import { connectRouteParams, routeParamLoader } from '../../utils/router';

export const PageActiveComponent: FunctionComponent<{
  appName: string;
  envName: string;
  componentName: string;
}> = ({ appName, envName, componentName }) => (
  <>
    <DocumentTitle title={`${componentName} in ${envName}`} />
    <ActiveComponentOverview {...{ appName, envName, componentName }} />
  </>
);

const Component = connectRouteParams(PageActiveComponent);
export { Component, routeParamLoader as loader };
