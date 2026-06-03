import { DocumentTitle } from '../../components/document-title'
import { withRouteParams } from '../../utils/router'
import { DeploymentJobComponentOverview } from './components/DeploymentJobComponentOverview'

type Props = {
  appName: string
  deploymentName: string
  jobComponentName: string
}
export function DeploymentJobComponentPage({ appName, deploymentName, jobComponentName }: Props) {
  return (
    <>
      <DocumentTitle title={`Job ${jobComponentName}`} />
      <DeploymentJobComponentOverview {...{ appName, deploymentName, jobComponentName }} />
    </>
  )
}

export default withRouteParams(DeploymentJobComponentPage)
