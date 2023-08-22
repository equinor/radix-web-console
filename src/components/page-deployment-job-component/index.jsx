import DeploymentJobComponentOverview from './deployment-job-component-overview';

import { DocumentTitle } from '../document-title';
import { connectRouteParams, routeParamLoader } from '../../utils/router';

export const PageDeploymentJobComponent = ({
  appName,
  deploymentName,
  jobComponentName,
}) => (
  <>
    <DocumentTitle title={`Job ${jobComponentName}`} />
    <DeploymentJobComponentOverview
      {...{ appName, deploymentName, jobComponentName }}
    />
  </>
);

const Component = connectRouteParams(PageDeploymentJobComponent);
export { Component, routeParamLoader as loader };
