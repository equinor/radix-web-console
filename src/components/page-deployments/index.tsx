import * as PropTypes from 'prop-types'

import AsyncResource from '../async-resource/async-resource'
import { Breadcrumb } from '../breadcrumb'
import { DeploymentsList } from '../deployments-list'
import { DocumentTitle } from '../document-title'
import { routes } from '../../routes'
import { useGetDeploymentsQuery } from '../../store/radix-api'
import { pollingInterval } from '../../store/defaults'
import { withRouteParams } from '../../utils/router'
import { routeWithParams } from '../../utils/string'

type Props = { appName: string }
export function PageDeployments({ appName }: Props) {
  const { data: deployments, ...state } = useGetDeploymentsQuery(
    { appName },
    { skip: !appName, pollingInterval }
  )

  return (
    <>
      <DocumentTitle title={`${appName} deployments`} />
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          { label: 'Deployments' },
        ]}
      />
      <AsyncResource asyncState={state}>
        <DeploymentsList appName={appName} deployments={deployments} />
      </AsyncResource>
    </>
  )
}

PageDeployments.propTypes = {
  appName: PropTypes.string.isRequired,
}

export default withRouteParams(PageDeployments)
