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
import { Breadcrumbs } from '@equinor/eds-core-react';

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
      <Breadcrumbs>
        <Breadcrumbs.Breadcrumb href={routeWithParams(routes.app, { appName })}>
          {appName}
        </Breadcrumbs.Breadcrumb>
        <Breadcrumbs.Breadcrumb href={routing.getEnvsUrl(appName)}>
          Environments
        </Breadcrumbs.Breadcrumb>
        <Breadcrumbs.Breadcrumb
          href={routeWithParams(routes.appEnvironment, {
            appName,
            envName,
          })}
        >
          {envName}
        </Breadcrumbs.Breadcrumb>
        <Breadcrumbs.Breadcrumb
          href={routeWithParams(routes.appActiveComponent, {
            appName,
            envName,
            componentName,
          })}
        >
          {componentName}
        </Breadcrumbs.Breadcrumb>
        <Breadcrumbs.Breadcrumb>
          {smallReplicaName(replicaName)}
        </Breadcrumbs.Breadcrumb>
      </Breadcrumbs>
      <main>
        <AsyncResource asyncState={getEnvironmentState}>
          <React.Fragment>
            <div className="o-layout-columns">
              <section>
                <h2 className="o-heading-section">Overview</h2>
                <p>
                  Replica <strong>{smallReplicaName(replicaName)}</strong>,
                  component <strong>{componentName}</strong>
                </p>
                {selectedReplica && (
                  <div>
                    <p>
                      Created{' '}
                      <strong>
                        <RelativeToNow
                          time={selectedReplica.created}
                        ></RelativeToNow>
                      </strong>
                    </p>
                    <p>
                      Duration{' '}
                      <strong>
                        <Duration start={selectedReplica.created} end={now} />
                      </strong>
                    </p>
                  </div>
                )}
                <p>
                  Status <ReplicaStatus replica={selectedReplica} />
                </p>
                {selectedReplica && selectedReplica.status !== STATUS_OK && (
                  <React.Fragment>
                    <p>Status message is:</p>
                    <Code wrap>{selectedReplica.statusMessage}</Code>
                  </React.Fragment>
                )}
                {selectedReplica &&
                  !Number.isNaN(selectedReplica.restartCount) &&
                  selectedReplica.restartCount > 0 && (
                    <p>Restarted {selectedReplica.restartCount} times</p>
                  )}
                <h2 className="o-heading-section">Log</h2>
                <AsyncResource asyncState={pollLogsState}>
                  {replicaLog && <Code copy>{replicaLog}</Code>}
                </AsyncResource>
              </section>
            </div>
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
