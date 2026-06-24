import { DocumentTitle } from '../../components/document-title'
import { withRouteParams } from '../../utils/router'
import { ActiveComponentOverview } from './components/ActiveComponentOverview'

type Props = {
  appName: string
  envName: string
  componentName: string
}
function ActiveComponentPage({ appName, envName, componentName }: Props) {
  return (
    <>
      <DocumentTitle title={`${componentName} in ${envName}`} />
      <ActiveComponentOverview appName={appName} envName={envName} componentName={componentName} />
    </>
  )
}

export default withRouteParams(ActiveComponentPage)
