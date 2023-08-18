import { FunctionComponent } from 'react';

import DeploymentComponentOverview from './deployment-component-overview';

import { DocumentTitle } from '../document-title';
import { mapRouteParamsToProps } from '../../utils/routing';

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
      appName={appName}
      deploymentName={deploymentName}
      componentName={componentName}
    />
  </>
);

export default mapRouteParamsToProps(
  ['appName', 'deploymentName', 'componentName'],
  PageDeploymentComponent
);
