import { FunctionComponent } from 'react';

import DeploymentJobComponentOverview from './deployment-job-component-overview';

import { DocumentTitle } from '../document-title';
import { connectRouteParams, routeParamLoader } from '../../utils/router';

export const PageDeploymentJobComponent: FunctionComponent<{
  appName: string;
  deploymentName: string;
  jobComponentName: string;
}> = ({ appName, deploymentName, jobComponentName }) => (
  <>
    <DocumentTitle title={`Job ${jobComponentName}`} />
    <DeploymentJobComponentOverview
      {...{ appName, deploymentName, jobComponentName }}
    />
  </>
);

const Component = connectRouteParams(PageDeploymentJobComponent);
export { Component, routeParamLoader as loader };
