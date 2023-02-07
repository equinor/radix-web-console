import DeploymentComponentOverview from './deployment-component-overview';

import { DocumentTitle } from '../document-title';
import { mapRouteParamsToProps } from '../../utils/routing';

export interface PageDeploymentComponentPros {
  appName: string;
  deploymentName: string;
  componentName: string;
}

export const PageDeploymentComponent = ({
  appName,
  deploymentName,
  componentName,
}: PageDeploymentComponentPros): JSX.Element => (
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
