import { FunctionComponent } from 'react';

import { DeploymentOverview } from './deployment-overview';

import { DocumentTitle } from '../document-title';
import { connectRouteParams, routeParamLoader } from '../../utils/router';
import { smallDeploymentName } from '../../utils/string';

export const PageDeployment: FunctionComponent<{
  appName: string;
  deploymentName: string;
}> = ({ appName, deploymentName }) => (
  <>
    <DocumentTitle
      title={`Deployment ${smallDeploymentName(deploymentName)}`}
    />
    <DeploymentOverview {...{ appName, deploymentName }} />
  </>
);

const Component = connectRouteParams(PageDeployment);
export { Component, routeParamLoader as loader };
