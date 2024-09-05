import { ActiveComponentOverview } from './active-component-overview'
import { DocumentTitle } from '../document-title'
import { withRouteParams } from '../../utils/router'

type Props = {
  appName: string
  envName: string
  componentName: string
}
export function PageActiveComponent({
  appName,
  envName,
  componentName,
}: Props) {
  return (
    <>
      <DocumentTitle title={`${componentName} in ${envName}`} />
      <ActiveComponentOverview
        appName={appName}
        envName={envName}
        componentName={componentName}
      />
    </>
  )
}

export default withRouteParams(PageActiveComponent)
