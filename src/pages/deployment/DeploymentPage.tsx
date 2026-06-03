import { DocumentTitle } from '../../components/document-title'
import { withRouteParams } from '../../utils/router'
import { smallDeploymentName } from '../../utils/string'
import { DeploymentOverview } from './components/DeploymentOverview'

type Props = {
  appName: string
  deploymentName: string
}

export function DeploymentPage({ appName, deploymentName }: Props) {
  return (
    <>
      <DocumentTitle title={`Deployment ${smallDeploymentName(deploymentName)}`} />
      <DeploymentOverview appName={appName} deploymentName={deploymentName} />
    </>
  )
}

export default withRouteParams(DeploymentPage)
