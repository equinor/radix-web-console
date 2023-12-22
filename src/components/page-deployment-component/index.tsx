import { FunctionComponent } from 'react';

import { DeploymentComponentOverview } from './deployment-component-overview';

import { DocumentTitle } from '../document-title';
import { connectRouteParams, routeParamLoader } from '../../utils/router';

export interface PageDeploymentComponentPros {
  appName: string;
  deploymentName: string;
  componentName: string;
}

export const PageDeploymentComponent: FunctionComponent<
  PageDeploymentComponentPros
> = ({ appName, deploymentName, componentName }) => (
  <>
    <DocumentTitle title={`Component ${componentName}`} />
    <DeploymentComponentOverview
      {...{ appName, deploymentName, componentName }}
    />
  </>
);

const Component = connectRouteParams(PageDeploymentComponent);
export { Component, routeParamLoader as loader };
