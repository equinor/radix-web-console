import { DeploymentOverview } from './deployment-overview';
import { DocumentTitle } from '../document-title';
import { withRouteParams } from '../../utils/router';
import { smallDeploymentName } from '../../utils/string';

type Props = {
  appName: string;
  deploymentName: string;
};

export function PageDeployment({ appName, deploymentName }: Props) {
  return (
    <>
      <DocumentTitle
        title={`Deployment ${smallDeploymentName(deploymentName)}`}
      />
      <DeploymentOverview appName={appName} deploymentName={deploymentName} />
    </>
  );
}

export default withRouteParams(PageDeployment);
