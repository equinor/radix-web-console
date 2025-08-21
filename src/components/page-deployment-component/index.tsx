import { withRouteParams } from '../../utils/router';
import { DocumentTitle } from '../document-title';
import { DeploymentComponentOverview } from './deployment-component-overview';

export interface Props {
  appName: string;
  deploymentName: string;
  componentName: string;
}

export function PageDeploymentComponent({
  appName,
  deploymentName,
  componentName,
}: Props) {
  return (
    <>
      <DocumentTitle title={`Component ${componentName}`} />
      <DeploymentComponentOverview
        appName={appName}
        deploymentName={deploymentName}
        componentName={componentName}
      />
    </>
  );
}
export default withRouteParams(PageDeploymentComponent);
