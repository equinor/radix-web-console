import { Typography } from '@equinor/eds-core-react'
import useLocalStorage from '../../effects/use-local-storage'
import { routes } from '../../routes'
import { pollingInterval } from '../../store/defaults'
import { radixApi, useGetEnvironmentQuery, useGetReplicaEventsQuery } from '../../store/radix-api'
import { getReplicaLogStreamUrl } from '../../store/eventstream-log-api'
import { withRouteParams } from '../../utils/router'
import { getEnvsUrl } from '../../utils/routing'
import { dataSorter, sortCompareDate } from '../../utils/sort-utils'
import { routeWithParams, smallReplicaName } from '../../utils/string'
import AsyncResource from '../async-resource/async-resource'
import { Breadcrumb } from '../breadcrumb'
import { StreamingLog } from '../code/log'
import { EventsList } from '../events-list'
import { ReplicaOverview } from '../replica/replica-overview'

interface Props {
  appName: string
  envName: string
  componentName: string
  replicaName: string
}

function PageReplica({ appName, envName, componentName, replicaName }: Props) {
  const environmentState = useGetEnvironmentQuery({ appName, envName }, { skip: !appName || !envName, pollingInterval })
  const [getLog] = radixApi.endpoints.replicaLog.useLazyQuery()
  const eventStreamUrl = getReplicaLogStreamUrl(appName, envName, componentName, replicaName)

  const replica = environmentState.data?.activeDeployment?.components
    ?.find((x) => x.name === componentName)
    ?.replicaList?.find((x) => x.name === replicaName)

  const [isEventListExpanded, setIsEventListExpanded] = useLocalStorage<boolean>('replicaEventListExpanded', false)
  const { data: events } = useGetReplicaEventsQuery(
    { appName, envName, componentName, podName: replicaName },
    {
      skip: !appName || !envName || !componentName || !replicaName || !isEventListExpanded,
      pollingInterval,
    }
  )

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
            to:
              replica?.type === 'JobManager' || replica?.type === 'JobManagerAux'
                ? routeWithParams(routes.appActiveJobComponent, {
                    appName,
                    envName,
                    jobComponentName: componentName,
                  })
                : routeWithParams(routes.appActiveComponent, {
                    appName,
                    envName,
                    componentName,
                  }),
          },
          { label: smallReplicaName(replicaName) },
        ]}
      />
      <AsyncResource asyncState={environmentState}>
        {replica && (
          <>
            <Typography variant="h4">Overview</Typography>
            <ReplicaOverview replica={replica} />
            <StreamingLog
              eventStreamUrl={eventStreamUrl}
              copy
              download
              downloadCb={() =>
                getLog({ appName, envName, componentName, podName: replicaName, lines: '100000000' }).unwrap()
              }
            />
          </>
        )}
      </AsyncResource>
      <EventsList
        isExpanded={isEventListExpanded}
        onExpanded={setIsEventListExpanded}
        events={dataSorter(events ?? [], [
          ({ lastTimestamp: x }, { lastTimestamp: y }) => sortCompareDate(x, y, 'descending'),
        ])}
      />
    </>
  )
}

export default withRouteParams(PageReplica)
