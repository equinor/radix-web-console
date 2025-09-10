import { withRouteParams } from '../../utils/router'
import { DocumentTitle } from '../document-title'
import { DeploymentJobComponentOverview } from './deployment-job-component-overview'

type Props = {
  appName: string
  deploymentName: string
  jobComponentName: string
}
export function PageDeploymentJobComponent({ appName, deploymentName, jobComponentName }: Props) {
  return (
    <>
      <DocumentTitle title={`Job ${jobComponentName}`} />
      <DeploymentJobComponentOverview {...{ appName, deploymentName, jobComponentName }} />
    </>
  )
}

export default withRouteParams(PageDeploymentJobComponent)
