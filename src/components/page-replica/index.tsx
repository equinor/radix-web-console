import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import useLocalStorage from '../../effects/use-local-storage';
import { routes } from '../../routes';
import { pollingInterval } from '../../store/defaults';
import {
  radixApi,
  useGetEnvironmentQuery,
  useGetReplicaEventsQuery,
  useReplicaLogQuery,
} from '../../store/radix-api';
import { withRouteParams } from '../../utils/router';
import { getEnvsUrl } from '../../utils/routing';
import { dataSorter, sortCompareDate } from '../../utils/sort-utils';
import { routeWithParams, smallReplicaName } from '../../utils/string';
import AsyncResource from '../async-resource/async-resource';
import { Breadcrumb } from '../breadcrumb';
import { downloadLog } from '../code/log-helper';
import { EventsList } from '../events-list';
import { Replica } from '../replica';

interface Props {
  appName: string;
  envName: string;
  componentName: string;
  replicaName: string;
}

function PageReplica({ appName, envName, componentName, replicaName }: Props) {
  const environmentState = useGetEnvironmentQuery(
    { appName, envName },
    { skip: !appName || !envName, pollingInterval }
  );
  const pollLogsState = useReplicaLogQuery(
    { appName, envName, componentName, podName: replicaName, lines: '1000' },
    {
      skip: !appName || !envName || !componentName || !replicaName,
      pollingInterval: 5000,
    }
  );
  const [getLog] = radixApi.endpoints.replicaLog.useLazyQuery();

  const replica = environmentState.data?.activeDeployment?.components
    ?.find((x) => x.name === componentName)
    ?.replicaList?.find((x) => x.name === replicaName);

  const { data: events } = useGetReplicaEventsQuery(
    { appName, envName, componentName, podName: replicaName },
    {
      skip: !appName || !envName || !componentName || !replicaName,
      pollingInterval,
    }
  );
  const [isEventListExpanded, setIsEventListExpanded] =
    useLocalStorage<boolean>('replicaEventListExpanded', false);

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
              replica?.type === 'JobManager' ||
              replica?.type === 'JobManagerAux'
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
          <Replica
            logState={pollLogsState}
            replica={replica}
            downloadCb={() =>
              downloadLog(`${replica.name}.txt`, () =>
                getLog(
                  {
                    appName,
                    envName,
                    componentName,
                    podName: replicaName,
                    file: 'true',
                  },
                  false
                ).unwrap()
              )
            }
            title={
              <Typography>
                Replica <strong>{smallReplicaName(replicaName)}</strong>,
                component <strong>{componentName}</strong>
              </Typography>
            }
          />
        )}
      </AsyncResource>
      <EventsList
        isExpanded={isEventListExpanded}
        onExpanded={setIsEventListExpanded}
        events={dataSorter(events ?? [], [
          ({ lastTimestamp: x }, { lastTimestamp: y }) =>
            sortCompareDate(x, y, 'descending'),
        ])}
      />
    </>
  );
}

PageReplica.propTypes = {
  appName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  replicaName: PropTypes.string.isRequired,
};

export default withRouteParams(PageReplica);
