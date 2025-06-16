import { Typography } from '@equinor/eds-core-react';

import { routes } from '../../routes';
import { pollingInterval } from '../../store/defaults';
import {
  radixApi,
  useGetEnvironmentQuery,
  useGetOAuthPodLogQuery,
} from '../../store/radix-api';
import { withRouteParams } from '../../utils/router';
import { getEnvsUrl } from '../../utils/routing';
import { routeWithParams, smallReplicaName } from '../../utils/string';
import AsyncResource from '../async-resource/async-resource';
import { Breadcrumb } from '../breadcrumb';
import { downloadLog } from '../code/log-helper';
import { Replica } from '../replica';

interface Props {
  appName: string;
  envName: string;
  componentName: string;
  type?: 'oauth' | 'oauth-redis' | '';
  replicaName: string;
}

export function PageOAuthAuxiliaryReplica({
  appName,
  envName,
  componentName,
  type,
  replicaName,
}: Props) {
  const environmentState = useGetEnvironmentQuery(
    { appName, envName },
    { skip: !appName || !envName, pollingInterval }
  );
  const cleanedType = type && type.length > 0 ? type : 'oauth';
  const oauthServiceTitle =
    cleanedType === 'oauth-redis' ? 'OAuth2 Redis' : 'OAuth2 Proxy';
  const pollLogsState = useGetOAuthPodLogQuery(
    {
      appName,
      envName,
      componentName,
      type: cleanedType,
      podName: replicaName,
      lines: '1000',
    },
    {
      skip: !appName || !envName || !componentName || !replicaName,
      pollingInterval: 5000,
    }
  );
  const [getLog] = radixApi.endpoints.getOAuthPodLog.useLazyQuery();

  const deployment = environmentState.data?.activeDeployment?.components
    ?.find((x) => x.name === componentName)
    ?.oauth2?.deployments?.find((d) => d.type === type);
  const replica = deployment?.replicaList?.find((x) => x.name === replicaName);

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
            label: oauthServiceTitle,
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
                    type: cleanedType,
                    podName: replicaName,
                    file: 'true',
                  },
                  false
                ).unwrap()
              )
            }
            title={
              <>
                <Typography>{oauthServiceTitle}</Typography>
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
}
export default withRouteParams(PageOAuthAuxiliaryReplica);
