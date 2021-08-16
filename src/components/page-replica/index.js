import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useGetEnvironment from '../page-environment/use-get-environment';
import usePollLogs from './use-poll-logs';
import useSelectReplica from './use-select-replica';

import Code from '../code';
import ReplicaStatus from '../replica-status';
import AsyncResource from '../async-resource/simple-async-resource';

import routes from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallReplicaName } from '../../utils/string';
import * as routing from '../../utils/routing';
import RelativeToNow from '../time/relative-to-now';
import Duration from '../time/duration';
import { Typography } from '@equinor/eds-core-react';
import Breadcrumb from '../breadcrumb';

const STATUS_OK = 'Running';

const PageReplica = (props) => {
  const { appName, envName, componentName, replicaName } = props;

  const [getEnvironmentState] = useGetEnvironment(appName, envName);
  const [pollLogsState] = usePollLogs(
    appName,
    envName,
    componentName,
    replicaName
  );
  const replica = useSelectReplica(
    getEnvironmentState.data,
    componentName,
    replicaName
  );
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    setNow(new Date());
  }, [pollLogsState]);
  const replicaLog = pollLogsState && pollLogsState.data;
  const selectedReplica = replica;

  return (
    <React.Fragment>
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          { label: 'Environments', to: routing.getEnvsUrl(appName) },
          {
            label: envName,
            to: routeWithParams(routes.appEnvironment, {
              appName,
              envName,
            }),
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
      <main>
        <AsyncResource asyncState={getEnvironmentState}>
          <React.Fragment>
            <section className="grid grid--gap-medium">
              <Typography variant="h4">Overview</Typography>
              <div className="grid grid--gap-medium grid--overview-columns">
                <div className="grid grid--gap-medium">
                  <Typography>
                    Replica <strong>{smallReplicaName(replicaName)}</strong>,
                    component <strong>{componentName}</strong>
                  </Typography>
                  <ReplicaStatus replica={selectedReplica} />
                </div>
                <div className="grid grid--gap-medium">
                  {selectedReplica && (
                    <>
                      <Typography>
                        Created{' '}
                        <strong>
                          <RelativeToNow
                            time={selectedReplica.created}
                          ></RelativeToNow>
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
              <div>
                {selectedReplica &&
                  selectedReplica.status !== STATUS_OK &&
                  selectedReplica.statusMessage && (
                    <div>
                      <Typography>Status message is:</Typography>
                      <Code wrap>{selectedReplica.statusMessage}</Code>
                    </div>
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
              </div>
            </section>
            <section className="step-log">
              <Typography variant="h4">Log</Typography>
              <AsyncResource asyncState={pollLogsState}>
                {replicaLog ? (
                  <Code copy download filename={replicaName}>
                    {replicaLog}
                  </Code>
                ) : (
                  <Typography>This replica has no log</Typography>
                )}
              </AsyncResource>
            </section>
          </React.Fragment>
        </AsyncResource>
      </main>
    </React.Fragment>
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
