import { DocumentTitle } from '../../components/document-title'
import { withRouteParams } from '../../utils/router'
import EnvironmentOverview from './components/EnvironmentOverview'

type Props = {
  appName: string
  envName: string
}
export function EnvironmentPage({ appName, envName }: Props) {
  return (
    <>
      <DocumentTitle title={`${envName} environment`} />
      <EnvironmentOverview {...{ appName, envName }} />
    </>
  )
}

export default withRouteParams(EnvironmentPage)
