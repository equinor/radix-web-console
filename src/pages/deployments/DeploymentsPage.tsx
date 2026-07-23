import AsyncResource from '../../components/async-resource/async-resource'
import { Breadcrumb } from '../../components/breadcrumb'
import { DeploymentListContainer } from '../../components/deployments-list'
import { DocumentTitle } from '../../components/document-title'
import { routes } from '../../router/routes'
import { pollingInterval } from '../../store/defaults'
import { useGetDeploymentsQuery } from '../../store/radix-api'
import { withRouteParams } from '../../utils/router'
import { routeWithParams } from '../../utils/string'

type Props = { appName: string }
function DeploymentsPage({ appName }: Props) {
  const { data: deployments, ...state } = useGetDeploymentsQuery({ appName }, { skip: !appName, pollingInterval })

  return (
    <>
      <DocumentTitle title={`${appName} deployments`} />
      <Breadcrumb
        links={[{ label: appName, to: routeWithParams(routes.app, { appName }) }, { label: 'Deployments' }]}
      />
      <AsyncResource asyncState={state}>
        <DeploymentListContainer appName={appName} deployments={deployments} />
      </AsyncResource>
    </>
  )
}
export default withRouteParams(DeploymentsPage)
