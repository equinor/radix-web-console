import { DocumentTitle } from '../../components/document-title'
import { withRouteParams } from '../../utils/router'
import { DeploymentComponentOverview } from './components/DeploymentComponentOverview'

export interface Props {
  appName: string
  deploymentName: string
  componentName: string
}

function DeploymentComponentPage({ appName, deploymentName, componentName }: Props) {
  return (
    <>
      <DocumentTitle title={`Component ${componentName}`} />
      <DeploymentComponentOverview appName={appName} deploymentName={deploymentName} componentName={componentName} />
    </>
  )
}
export default withRouteParams(DeploymentComponentPage)
