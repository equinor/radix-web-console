import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { usePollAuxiliaryLogs } from './use-poll-logs';
import { useSelectAuxiliaryResourceReplica } from './use-select-replica';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { Code } from '../code';
import useGetEnvironment from '../page-environment/use-get-environment';
import { ReplicaStatus } from '../replica-status';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { routes } from '../../routes';
import { getEnvsUrl, mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallReplicaName } from '../../utils/string';
import { ReplicaImage } from '../replica-image';
import { auxiliaryResourceDisplayName } from '../../models/auxiliary-resource-type';

const STATUS_OK = 'Running';

const PageAuxiliaryReplica = (props) => {
  const { appName, envName, componentName, auxType, replicaName } = props;

  const [getEnvironmentState] = useGetEnvironment(appName, envName);
  const [pollLogsState] = usePollAuxiliaryLogs(
    appName,
    envName,
    componentName,
    auxType,
    replicaName
  );
  const replica = useSelectAuxiliaryResourceReplica(
    getEnvironmentState.data,
    componentName,
    auxType,
    replicaName
  );

  const [now, setNow] = useState(new Date());
  useEffect(() => setNow(new Date()), [pollLogsState]);

  const [auxDisplayName, setAuxDisplayName] = useState();
  useEffect(
    () => setAuxDisplayName(auxiliaryResourceDisplayName[auxType]),
    [auxType]
  );

  const replicaLog = pollLogsState?.data;
  const selectedReplica = replica;

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
          { label: auxType },
          { label: smallReplicaName(replicaName) },
        ]}
      />
      <AsyncResource asyncState={getEnvironmentState}>
        <section className="grid grid--gap-medium overview">
          <Typography variant="h4">Overview</Typography>
          <div className="grid grid--gap-medium grid--overview-columns">
            <div className="grid grid--gap-medium">
              <Typography>{auxDisplayName ?? auxType}</Typography>
              <Typography>
                Replica <strong>{smallReplicaName(replicaName)}</strong>,
                component <strong>{componentName}</strong>
              </Typography>
              <ReplicaImage replica={replica} />
              <ReplicaStatus replica={selectedReplica} />
            </div>
            <div className="grid grid--gap-medium">
              {selectedReplica && (
                <>
                  <Typography>
                    Created{' '}
                    <strong>
                      <RelativeToNow time={selectedReplica.created} />
                    </strong>
                  </Typography>
                  <Typography>
                    Duration{' '}
                    <strong>
                      <Duration start={selectedReplica.created} end={now} />
                    </strong>
                  </Typography>
                </>
              )}
            </div>
          </div>
        </section>
        <section className="grid grid--gap-medium">
          {selectedReplica &&
            selectedReplica.status !== STATUS_OK &&
            selectedReplica.statusMessage && (
              <>
                <Typography>Status message is:</Typography>
                <Code>{selectedReplica.statusMessage}</Code>
              </>
            )}
          {selectedReplica &&
            !Number.isNaN(selectedReplica.restartCount) &&
            selectedReplica.restartCount > 0 && (
              <div>
                <Typography>
                  Restarted {selectedReplica.restartCount} times
                </Typography>
              </div>
            )}
        </section>
        <section className="step-log">
          <Typography variant="h4">Log</Typography>
          <AsyncResource asyncState={pollLogsState}>
            {replicaLog ? (
              <Code copy download filename={replicaName} autoscroll resizable>
                {replicaLog}
              </Code>
            ) : (
              <Typography>This replica has no log</Typography>
            )}
          </AsyncResource>
        </section>
      </AsyncResource>
    </>
  );
};

PageAuxiliaryReplica.propTypes = {
  appName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string,
  envName: PropTypes.string.isRequired,
  auxTyupe: PropTypes.string.isRequired,
  replicaName: PropTypes.string.isRequired,
};

export default mapRouteParamsToProps(
  ['appName', 'envName', 'componentName', 'auxType', 'replicaName'],
  PageAuxiliaryReplica
);
