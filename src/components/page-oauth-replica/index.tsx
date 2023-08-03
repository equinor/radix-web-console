import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { useGetOAuthFullLogs } from './use-get-oauth-full-logs';
import { usePollOAuthLogs } from './use-poll-oauth-logs';

import AsyncResource from '../async-resource/simple-async-resource';
import { LogDownloadOverrideType } from '../component/log';
import { Breadcrumb } from '../breadcrumb';
import { useGetEnvironment } from '../page-environment/use-get-environment';
import { Replica } from '../replica';
import { ReplicaSummaryNormalizedModel } from '../../models/radix-api/deployments/replica-summary';
import { routes } from '../../routes';
import { getEnvsUrl, mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallReplicaName } from '../../utils/string';

export interface PageOAuthAuxiliaryReplicaProps {
  appName: string;
  envName: string;
  componentName: string;
  replicaName: string;
}

export const PageOAuthAuxiliaryReplica = ({
  appName,
  envName,
  componentName,
  replicaName,
}: PageOAuthAuxiliaryReplicaProps): React.JSX.Element => {
  const [environmentState] = useGetEnvironment(appName, envName);
  const [pollLogsState] = usePollOAuthLogs(
    appName,
    envName,
    componentName,
    replicaName
  );
  const [getFullLogsState, downloadFullLog] = useGetOAuthFullLogs(
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
      ?.oauth2?.deployment?.replicaList?.find((x) => x.name === replicaName);

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
          { label: 'oauth' },
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
              <>
                <Typography>OAuth2 Service</Typography>
                <Typography>
                  Replica <strong>{smallReplicaName(replicaName)}</strong>,
                  component <strong>{componentName}</strong>
                </Typography>
              </>
            }
          />
        )}
      </AsyncResource>
    </>
  );
};

PageOAuthAuxiliaryReplica.propTypes = {
  appName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  replicaName: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<PageOAuthAuxiliaryReplicaProps>;

export default mapRouteParamsToProps(
  ['appName', 'envName', 'componentName', 'replicaName'],
  PageOAuthAuxiliaryReplica
);
