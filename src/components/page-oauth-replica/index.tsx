import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useState } from 'react';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { downloadLazyLogCb } from '../code/log-helper';
import { useGetEnvironment } from '../page-environment/use-get-environment';
import { Replica } from '../replica';
import { ReplicaSummaryNormalizedModel } from '../../models/radix-api/deployments/replica-summary';
import { routes } from '../../routes';
import { radixApi, useGetOAuthPodLogQuery } from '../../store/radix-api';
import { connectRouteParams, routeParamLoader } from '../../utils/router';
import { getEnvsUrl } from '../../utils/routing';
import { routeWithParams, smallReplicaName } from '../../utils/string';

export interface PageOAuthAuxiliaryReplicaProps {
  appName: string;
  envName: string;
  componentName: string;
  replicaName: string;
}

export const PageOAuthAuxiliaryReplica: FunctionComponent<
  PageOAuthAuxiliaryReplicaProps
> = ({ appName, envName, componentName, replicaName }) => {
  const [environmentState] = useGetEnvironment(appName, envName);
  const pollLogsState = useGetOAuthPodLogQuery(
    { appName, envName, componentName, podName: replicaName, lines: '1000' },
    {
      skip: !appName || !envName || !componentName || !replicaName,
      pollingInterval: 5000,
    }
  );
  const [getLog] = radixApi.endpoints.getOAuthPodLog.useLazyQuery();

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
            downloadCb={downloadLazyLogCb(
              `${replica.name}.txt`,
              getLog,
              {
                appName,
                envName,
                componentName,
                podName: replicaName,
                file: 'true',
              },
              false
            )}
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
};

const Component = connectRouteParams(PageOAuthAuxiliaryReplica);
export { Component, routeParamLoader as loader };
