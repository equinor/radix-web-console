import { FunctionComponent } from 'react';

import DeploymentOverview from './deployment-overview';

import { DocumentTitle } from '../document-title';
import { mapRouteParamsToProps } from '../../utils/routing';
import { smallDeploymentName } from '../../utils/string';

export interface PageDeploymentProps {
  appName: string;
  deploymentName: string;
}

export const PageDeployment: FunctionComponent<PageDeploymentProps> = ({
  appName,
  deploymentName,
}) => (
  <>
    <DocumentTitle
      title={`Deployment ${smallDeploymentName(deploymentName)}`}
    />
    <DeploymentOverview appName={appName} deploymentName={deploymentName} />
  </>
);

export default mapRouteParamsToProps(
  ['appName', 'deploymentName'],
  PageDeployment
);
