import * as PropTypes from 'prop-types'

import { routes } from '../../routes'
import { pollingInterval } from '../../store/defaults'
import { useGetApplicationQuery } from '../../store/radix-api'
import { withRouteParams } from '../../utils/router'
import { routeWithParams } from '../../utils/string'
import AsyncResource from '../async-resource/async-resource'
import { Breadcrumb } from '../breadcrumb'
import { DocumentTitle } from '../document-title'
import { EnvironmentsSummary } from '../environments-summary'

type Props = { appName: string }
export function PageEnvironments({ appName }: Props) {
  const { data: application, ...state } = useGetApplicationQuery(
    { appName },
    { skip: !appName, pollingInterval }
  )
  const { environments, registration } = application ?? {}

  return (
    <>
      <DocumentTitle title={`${appName} environments`} />
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          { label: 'Environments' },
        ]}
      />

      <AsyncResource asyncState={state}>
        <EnvironmentsSummary
          appName={appName}
          envs={environments}
          repository={registration?.repository}
        />
      </AsyncResource>
    </>
  )
}

PageEnvironments.propTypes = {
  appName: PropTypes.string.isRequired,
}

export default withRouteParams(PageEnvironments)
