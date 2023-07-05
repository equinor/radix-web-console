import DeploymentJobComponentOverview from './deployment-job-component-overview';

import { DocumentTitle } from '../document-title';
import { mapRouteParamsToProps } from '../../utils/routing';

export const PageDeploymentJobComponent = ({
  appName,
  deploymentName,
  jobComponentName,
}) => (
  <>
    <DocumentTitle title={`Job ${jobComponentName}`} />
    <DeploymentJobComponentOverview
      appName={appName}
      deploymentName={deploymentName}
      jobComponentName={jobComponentName}
    />
  </>
);

export default mapRouteParamsToProps(
  ['appName', 'deploymentName', 'jobComponentName'],
  PageDeploymentJobComponent
);
