import AsyncResource from '../../components/async-resource/async-resource'
import { Breadcrumb } from '../../components/breadcrumb'
import { DocumentTitle } from '../../components/document-title'
import { EnvironmentCardList } from '../../components/environment-card-list/EnvironmentCardList'
import { routes } from '../../router/routes'
import { pollingInterval } from '../../store/defaults'
import { useGetApplicationQuery } from '../../store/radix-api'
import { withRouteParams } from '../../utils/router'
import { routeWithParams } from '../../utils/string'

type Props = { appName: string }
function EnvironmentsPage({ appName }: Props) {
  const { data: application, ...state } = useGetApplicationQuery({ appName }, { skip: !appName, pollingInterval })

  return (
    <>
      <DocumentTitle title={`${appName} environments`} />
      <Breadcrumb
        links={[{ label: appName, to: routeWithParams(routes.app, { appName }) }, { label: 'Environments' }]}
      />

      <AsyncResource asyncState={state}>
        {application && <EnvironmentCardList application={application} />}
      </AsyncResource>
    </>
  )
}

export default withRouteParams(EnvironmentsPage)
