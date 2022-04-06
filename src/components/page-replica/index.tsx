import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { usePollReplicaLogs } from './use-poll-replica-logs';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { useGetEnvironment } from '../page-environment/use-get-environment';
import { routes } from '../../routes';
import { getEnvsUrl, mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallReplicaName } from '../../utils/string';
import { Replica } from '../replica';
import { useEffect, useState } from 'react';
import { ReplicaSummaryNormalizedModel } from '../../models/replica-summary';
import { ReplicaSummaryModelNormalizer } from '../../models/replica-summary/normalizer';

const PageReplica = (props) => {
  const { appName, envName, componentName, replicaName } = props;
  const [environmentState] = useGetEnvironment(appName, envName);
  const [pollLogsState] = usePollReplicaLogs(
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
    const selectedReplica = component?.replicaList?.find(
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
          { label: smallReplicaName(replicaName) },
        ]}
      />
      <AsyncResource asyncState={environmentState}>
        <Replica
          logState={pollLogsState}
          replica={replica}
          title={
            <Typography>
              Replica <strong>{smallReplicaName(replicaName)}</strong>,
              component <strong>{componentName}</strong>
            </Typography>
          }
        />
      </AsyncResource>
    </>
  );
};

PageReplica.propTypes = {
  appName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string,
  envName: PropTypes.string.isRequired,
  replicaName: PropTypes.string.isRequired,
};

export default mapRouteParamsToProps(
  ['appName', 'envName', 'componentName', 'replicaName'],
  PageReplica
);
