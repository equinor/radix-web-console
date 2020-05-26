import React from 'react';
import PropTypes from 'prop-types';

import useGetEnvironment from '../page-environment/use-get-environment';
import usePollLogs from './use-poll-logs';
import useSelectReplica from './use-select-replica';

import Breadcrumb from '../breadcrumb';
import Code from '../code';
import EnvironmentBadge from '../environment-badge';
import ReplicaStatus from '../replica-status';
import AsyncResource from '../async-resource/simple-async-resource';

import routes from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallReplicaName } from '../../utils/string';
import * as routing from '../../utils/routing';

const STATUS_OK = 'Running';

const PageReplica = (props) => {
  const {
    appName,
    envName,
    deploymentName,
    componentName,
    replicaName,
  } = props;

  const [getEnvironmentState] = useGetEnvironment(appName, envName);
  const [pollLogsState] = usePollLogs(
    appName,
    deploymentName,
    componentName,
    replicaName
  );
  const replica = useSelectReplica(
    getEnvironmentState.data,
    componentName,
    replicaName
  );
  const replicaStatus = replica ? replica.replicaStatus : null;
  const replicaLog = pollLogsState && pollLogsState.data;

  return (
    <React.Fragment>
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          { label: 'Environments', to: routing.getEnvsUrl(appName) },
          {
            label: <EnvironmentBadge envName={envName} />,
            to: routeWithParams(routes.appEnvironment, {
              appName,
              envName,
            }),
          },
          {
            to: routeWithParams(routes.appActiveComponent, {
              appName,
              envName,
              componentName,
            }),
            label: componentName,
          },
          { label: smallReplicaName(replicaName) },
        ]}
      />
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
                <p>
                  Status <ReplicaStatus replica={replicaStatus} />
                </p>
                {replicaStatus && replicaStatus.status !== STATUS_OK && (
                  <React.Fragment>
                    <p>Status message is:</p>
                    <Code wrap>{replica.statusMessage}</Code>
                  </React.Fragment>
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
  ['appName', 'envName', 'deploymentName', 'componentName', 'replicaName'],
  PageReplica
);
