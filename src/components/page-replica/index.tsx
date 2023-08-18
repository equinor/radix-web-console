import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useState } from 'react';

import { useGetReplicaFullLog } from './use-get-replica-full-log';
import { usePollReplicaLogs } from './use-poll-replica-logs';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { LogDownloadOverrideType } from '../component/log';
import { useGetEnvironment } from '../page-environment/use-get-environment';
import { Replica } from '../replica';
import { ReplicaSummaryNormalizedModel } from '../../models/radix-api/deployments/replica-summary';
import { routes } from '../../routes';
import { getEnvsUrl, mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallReplicaName } from '../../utils/string';

export interface PageReplicaProps {
  appName: string;
  envName: string;
  componentName: string;
  replicaName: string;
}

const PageReplica: FunctionComponent<PageReplicaProps> = ({
  appName,
  envName,
  componentName,
  replicaName,
}) => {
  const [environmentState] = useGetEnvironment(appName, envName);
  const [pollLogsState] = usePollReplicaLogs(
    appName,
    envName,
    componentName,
    replicaName
  );
  const [getFullLogsState, downloadFullLog] = useGetReplicaFullLog(
    appName,
    envName,
    componentName,
    replicaName
  );

  const downloadOverride: LogDownloadOverrideType = {
    status: getFullLogsState.status,
    content: getFullLogsState.data,
    onDownload: () => downloadFullLog(),
    error: getFullLogsState.error,
  };

  const [replica, setReplica] = useState<ReplicaSummaryNormalizedModel>();
  useEffect(() => {
    const replica = environmentState.data?.activeDeployment?.components
      ?.find((x) => x.name === componentName)
      ?.replicaList?.find((x) => x.name === replicaName);

    replica && setReplica(replica);
  }, [environmentState.data, componentName, replicaName]);

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
          { label: smallReplicaName(replicaName) },
        ]}
      />
      <AsyncResource asyncState={environmentState}>
        {replica && (
          <Replica
            logState={pollLogsState}
            replica={replica}
            downloadOverride={downloadOverride}
            title={
              <Typography>
                Replica <strong>{smallReplicaName(replicaName)}</strong>,
                component <strong>{componentName}</strong>
              </Typography>
            }
          />
        )}
      </AsyncResource>
    </>
  );
};

PageReplica.propTypes = {
  appName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  replicaName: PropTypes.string.isRequired,
};

export default mapRouteParamsToProps(
  ['appName', 'envName', 'componentName', 'replicaName'],
  PageReplica
);
