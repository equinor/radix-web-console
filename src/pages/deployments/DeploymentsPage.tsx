import AsyncResource from '../../components/async-resource/async-resource'
import { Breadcrumb } from '../../components/breadcrumb'
import { DeploymentListContainer } from '../../components/deployments-list'
import { DocumentTitle } from '../../components/document-title'
import { FirstTimeApplyConfig } from '../../components/first-time-apply-config/FirstTimeApplyConfig'
import { routes } from '../../router/routes'
import { pollingInterval } from '../../store/defaults'
import { useGetApplicationQuery, useGetDeploymentsQuery } from '../../store/radix-api'
import { withRouteParams } from '../../utils/router'
import { routeWithParams } from '../../utils/string'

interface DeploymentPageProps {
  readonly appName: string
}

function DeploymentsPage({ appName }: DeploymentPageProps) {
  const { data: deployments, ...state } = useGetDeploymentsQuery({ appName }, { skip: !appName, pollingInterval })
  const { data: application, ...applicationState } = useGetApplicationQuery(
    { appName },
    { skip: !appName, pollingInterval }
  )

  return (
    <>
      <DocumentTitle title={`${appName} deployments`} />
      <Breadcrumb
        links={[{ label: appName, to: routeWithParams(routes.app, { appName }) }, { label: 'Deployments' }]}
      />
      <AsyncResource asyncState={applicationState}>
        {application && <FirstTimeApplyConfig application={application} />}
      </AsyncResource>
      <AsyncResource asyncState={state}>
        <DeploymentListContainer appName={appName} deployments={deployments} />
      </AsyncResource>
    </>
  )
}
export default withRouteParams(DeploymentsPage)
