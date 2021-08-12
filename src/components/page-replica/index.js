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
import { Breadcrumbs, Typography } from '@equinor/eds-core-react';
import { NavLink } from 'react-router-dom';

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
        <Breadcrumbs.Breadcrumb>
          <NavLink to={routeWithParams(routes.app, { appName })}>
            {appName}
          </NavLink>
        </Breadcrumbs.Breadcrumb>
        <Breadcrumbs.Breadcrumb>
          <NavLink to={routing.getEnvsUrl(appName)}>Environments</NavLink>
        </Breadcrumbs.Breadcrumb>
        <Breadcrumbs.Breadcrumb>
          <NavLink
            to={routeWithParams(routes.appEnvironment, {
              appName,
              envName,
            })}
          >
            {envName}
          </NavLink>
        </Breadcrumbs.Breadcrumb>
        <Breadcrumbs.Breadcrumb>
          <NavLink
            to={routeWithParams(routes.appActiveComponent, {
              appName,
              envName,
              componentName,
            })}
          >
            {componentName}
          </NavLink>
        </Breadcrumbs.Breadcrumb>
        <Breadcrumbs.Breadcrumb>
          {smallReplicaName(replicaName)}
        </Breadcrumbs.Breadcrumb>
      </Breadcrumbs>
      <main>
        <AsyncResource asyncState={getEnvironmentState}>
          <React.Fragment>
            <section className="grid--component-overview">
              <Typography variant="h4">Overview</Typography>
              <div className="grid grid--gap-medium">
                <div>
                  <Typography variant="body_short">
                    Replica <strong>{smallReplicaName(replicaName)}</strong>,
                    component <strong>{componentName}</strong>
                  </Typography>
                  <ReplicaStatus replica={selectedReplica} />
                </div>
                <div>
                  {selectedReplica && (
                    <>
                      <Typography variant="body_short">
                        Created{' '}
                        <strong>
                          <RelativeToNow
                            time={selectedReplica.created}
                          ></RelativeToNow>
                        </strong>
                      </Typography>
                      <Typography variant="body_short">
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
                      <Typography variant="body_short">
                        Status message is:
                      </Typography>
                      <Code wrap>{selectedReplica.statusMessage}</Code>
                    </div>
                  )}
                {selectedReplica &&
                  !Number.isNaN(selectedReplica.restartCount) &&
                  selectedReplica.restartCount > 0 && (
                    <div>
                      <Typography variant="body_short">
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
                  <Code copy>{replicaLog}</Code>
                ) : (
                  <Typography variant="body_short">
                    This replica has no log
                  </Typography>
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
