import AsyncResource from '../../components/async-resource/async-resource'
import { Breadcrumb } from '../../components/breadcrumb'
import { DocumentTitle } from '../../components/document-title'
import { EnvironmentsSummary } from '../../components/environments-summary'
import { routes } from '../../router/routes'
import { pollingInterval } from '../../store/defaults'
import { useGetApplicationQuery } from '../../store/radix-api'
import { withRouteParams } from '../../utils/router'
import { routeWithParams } from '../../utils/string'

type Props = { appName: string }
export function EnvironmentsPage({ appName }: Props) {
  const { data: application, ...state } = useGetApplicationQuery({ appName }, { skip: !appName, pollingInterval })

  return (
    <>
      <DocumentTitle title={`${appName} environments`} />
      <Breadcrumb
        links={[{ label: appName, to: routeWithParams(routes.app, { appName }) }, { label: 'Environments' }]}
      />

      <AsyncResource asyncState={state}>
        {application && <EnvironmentsSummary application={application} />}
      </AsyncResource>
    </>
  )
}

export default withRouteParams(EnvironmentsPage)
