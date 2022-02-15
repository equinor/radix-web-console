import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { usePollLogs } from './use-poll-logs';
import { useSelectReplica } from './use-select-replica';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import useGetEnvironment from '../page-environment/use-get-environment';
import { routes } from '../../routes';
import { getEnvsUrl, mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallReplicaName } from '../../utils/string';
import { Replica } from '../replica';

const PageOAuthAuxiliaryReplica = (props) => {
  const { appName, envName, componentName, replicaName } = props;

  const [environmentState] = useGetEnvironment(appName, envName);
  const [pollLogsState] = usePollLogs(
    appName,
    envName,
    componentName,
    replicaName
  );
  const replica = useSelectReplica(
    environmentState.data,
    componentName,
    replicaName
  );

  return (
    <>
      <Breadcrumb
        className="breadcrumb"
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
};

export default mapRouteParamsToProps(
  ['appName', 'envName', 'componentName', 'replicaName'],
  PageOAuthAuxiliaryReplica
);
