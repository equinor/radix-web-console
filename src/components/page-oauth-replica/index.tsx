import { Typography } from '@equinor/eds-core-react'
import { routes } from '../../routes'
import { pollingInterval } from '../../store/defaults'
import { getOauthAuxiliaryLogStreamUrl } from '../../store/eventstream-log-api'
import { radixApi, useGetEnvironmentQuery } from '../../store/radix-api'
import { getOAuthServiceTitle, getValidatedOAuthType } from '../../utils/oauth'
import { withRouteParams } from '../../utils/router'
import { getEnvsUrl } from '../../utils/routing'
import { routeWithParams, smallReplicaName } from '../../utils/string'
import AsyncResource from '../async-resource/async-resource'
import { Breadcrumb } from '../breadcrumb'
import { StreamingLog } from '../code/log'
import { ReplicaOverview } from '../replica/replica-overview'

interface Props {
  appName: string
  envName: string
  componentName: string
  type: 'oauth' | 'oauth-redis'
  replicaName: string
}

export function PageOAuthAuxiliaryReplica({ appName, envName, componentName, type, replicaName }: Props) {
  const environmentState = useGetEnvironmentQuery({ appName, envName }, { skip: !appName || !envName, pollingInterval })
  const [getLog] = radixApi.endpoints.getOAuthPodLog.useLazyQuery()
  const eventStreamUrl = getOauthAuxiliaryLogStreamUrl(appName, envName, componentName, type, replicaName)

  const deployment = environmentState.data?.activeDeployment?.components
    ?.find((x) => x.name === componentName)
    ?.oauth2?.deployments?.find((d) => d.type === type)
  const replica = deployment?.replicaList?.find((x) => x.name === replicaName)

  return (
    <>
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          { label: 'Environments', to: getEnvsUrl(appName) },
          {
            label: envName,
            to: routeWithParams(routes.appEnvironment, { appName, envName }),
          },
          {
            label: componentName,
            to: routeWithParams(routes.appActiveComponent, {
              appName,
              envName,
              componentName,
            }),
          },
          {
            label: `OAuth2 ${getOAuthServiceTitle(type)}`,
          },
          { label: smallReplicaName(replicaName) },
        ]}
      />

      <AsyncResource asyncState={environmentState}>
        {replica && (
          <>
            <Typography variant="h4">Overview</Typography>
            <ReplicaOverview
              replica={replica}
              title={
                <>
                  <Typography>
                    OAuth2 Service <strong>{getOAuthServiceTitle(type)}</strong>
                  </Typography>
                  <Typography>
                    Replica <strong>{smallReplicaName(replicaName)}</strong>, component <strong>{componentName}</strong>
                  </Typography>
                </>
              }
            />

            <StreamingLog
              eventStreamUrl={eventStreamUrl}
              copy
              download
              filename={`${replica.name}.txt`}
              downloadCb={() =>
                getLog(
                  {
                    appName,
                    envName,
                    componentName,
                    type: getValidatedOAuthType(type),
                    podName: replicaName,
                    file: 'true',
                  },
                  false
                ).unwrap()
              }
            />
          </>
        )}
      </AsyncResource>
    </>
  )
}
export default withRouteParams(PageOAuthAuxiliaryReplica)
