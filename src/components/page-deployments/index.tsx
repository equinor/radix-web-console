import { routes } from '../../routes'
import { pollingInterval } from '../../store/defaults'
import { useGetDeploymentsQuery } from '../../store/radix-api'
import { withRouteParams } from '../../utils/router'
import { routeWithParams } from '../../utils/string'
import AsyncResource from '../async-resource/async-resource'
import { Breadcrumb } from '../breadcrumb'
import { DeploymentsList } from '../deployments-list'
import { DocumentTitle } from '../document-title'

type Props = { appName: string }
export function PageDeployments({ appName }: Props) {
  const { data: deployments, ...state } = useGetDeploymentsQuery({ appName }, { skip: !appName, pollingInterval })

  return (
    <>
      <DocumentTitle title={`${appName} deployments`} />
      <Breadcrumb
        links={[{ label: appName, to: routeWithParams(routes.app, { appName }) }, { label: 'Deployments' }]}
      />
      <AsyncResource asyncState={state}>
        <DeploymentsList appName={appName} deployments={deployments} />
      </AsyncResource>
    </>
  )
}
export default withRouteParams(PageDeployments)
