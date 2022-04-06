import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { usePollOAuthLogs } from './use-poll-oauth-logs';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { useGetEnvironment } from '../page-environment/use-get-environment';
import { routes } from '../../routes';
import { getEnvsUrl, mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallReplicaName } from '../../utils/string';
import { Replica } from '../replica';
import { ReplicaSummaryNormalizedModel } from '../../models/replica-summary';
import { ReplicaSummaryModelNormalizer } from '../../models/replica-summary/normalizer';

export interface PageOAuthAuxiliaryReplicaProps {
  appName: string;
  envName: string;
  componentName: string;
  replicaName: string;
}

export const PageOAuthAuxiliaryReplica = (
  props: PageOAuthAuxiliaryReplicaProps
): JSX.Element => {
  const { appName, envName, componentName, replicaName } = props;

  const [environmentState] = useGetEnvironment(appName, envName);
  const [pollLogsState] = usePollOAuthLogs(
    appName,
    envName,
    componentName,
    replicaName
  );

  const [replica, setReplica] = useState<ReplicaSummaryNormalizedModel>();
  useEffect(() => {
    const component = environmentState.data?.activeDeployment?.components?.find(
      (x) => x.name === componentName
    );
    const selectedReplica = component?.oauth2?.deployment?.replicaList?.find(
      (x) => x.name === replicaName
    );

    selectedReplica &&
      setReplica(ReplicaSummaryModelNormalizer(selectedReplica));
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
        <Replica
          logState={pollLogsState}
          replica={replica}
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
