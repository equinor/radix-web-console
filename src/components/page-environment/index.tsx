import EnvironmentOverview from './environment-overview'

import { withRouteParams } from '../../utils/router'
import { DocumentTitle } from '../document-title'

type Props = {
  appName: string
  envName: string
}
export function PageEnvironment({ appName, envName }: Props) {
  return (
    <>
      <DocumentTitle title={`${envName} environment`} />
      <EnvironmentOverview {...{ appName, envName }} />
    </>
  )
}

export default withRouteParams(PageEnvironment)
