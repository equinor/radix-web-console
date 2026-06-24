import { DocumentTitle } from '../../components/document-title'
import { withRouteParams } from '../../utils/router'
import { ActiveJobComponentOverview } from './components/ActiveJobComponentOverview'

type Props = {
  appName: string
  envName: string
  jobComponentName: string
}
function ActiveJobComponentPage({ appName, envName, jobComponentName }: Props) {
  return (
    <>
      <DocumentTitle title={`${jobComponentName} in ${envName}`} />
      <ActiveJobComponentOverview {...{ appName, envName, jobComponentName }} />
    </>
  )
}

export default withRouteParams(ActiveJobComponentPage)
