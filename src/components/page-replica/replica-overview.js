import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Breadcrumb from '../breadcrumb';
import Code from '../code';
import EnvironmentBadge from '../environment-badge';
import ReplicaStatus from '../replica-status';

import { routeWithParams, smallReplicaName } from '../../utils/string';
import { getReplica, getActiveDeploymentName } from '../../state/environment';
import { getReplicaLog } from '../../state/replica_log';
import * as actionCreators from '../../state/subscriptions/action-creators';
import * as routing from '../../utils/routing';
import routes from '../../routes';

const STATUS_OK = 'Running';

export class ReplicaOverview extends React.Component {
  // TODO: There must be a better way to do this subscription/unsubscription
  componentDidMount() {
    const {
      appName,
      envName,
      deploymentName,
      componentName,
      replicaName,
      subscribe,
    } = this.props;

    subscribe(appName, envName, deploymentName, componentName, replicaName);
  }

  componentDidUpdate(prevProps) {
    const {
      appName,
      envName,
      deploymentName,
      componentName,
      replicaName,
      subscribe,
      unsubscribe,
    } = this.props;

    if (
      appName !== prevProps.appName ||
      envName !== prevProps.envName ||
      deploymentName !== prevProps.deploymentName ||
      componentName !== prevProps.componentName ||
      replicaName !== prevProps.replicaName
    ) {
      unsubscribe(
        prevProps.appName,
        prevProps.envName,
        prevProps.deploymentName,
        prevProps.componentName,
        prevProps.replicaName
      );
      subscribe(appName, envName, deploymentName, componentName, replicaName);
    }
  }

  componentWillUnmount() {
    const {
      appName,
      envName,
      deploymentName,
      componentName,
      replicaName,
      unsubscribe,
    } = this.props;

    unsubscribe(appName, envName, deploymentName, componentName, replicaName);
  }

  render() {
    const {
      appName,
      envName,
      componentName,
      replicaName,
      replica,
      replicaLog,
    } = this.props;

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
          {!replica && 'No replica…'}
          {replica && (
            <React.Fragment>
              <div className="o-layout-columns">
                <section>
                  <h2 className="o-heading-section">Overview</h2>
                  <p>
                    Replica <strong>{smallReplicaName(replicaName)}</strong>,
                    component <strong>{componentName}</strong>
                  </p>
                  <p>
                    Status <ReplicaStatus replica={replica} />
                  </p>
                  {replica.replicaStatus.status !== STATUS_OK && (
                    <p>
                      Status message is <samp>{replica.statusMessage}</samp>
                    </p>
                  )}
                  {replicaLog && (
                    <React.Fragment>
                      <h2 className="o-heading-section">Log</h2>
                      <Code copy>{replicaLog}</Code>
                    </React.Fragment>
                  )}
                </section>
              </div>
            </React.Fragment>
          )}
        </main>
      </React.Fragment>
    );
  }
}

ReplicaOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string,
  envName: PropTypes.string.isRequired,
  replicaName: PropTypes.string.isRequired,
  replica: PropTypes.object,
  replicaLog: PropTypes.string,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { componentName, replicaName }) => ({
  deploymentName: getActiveDeploymentName(state),
  replica: getReplica(state, componentName, replicaName),
  replicaLog: getReplicaLog(state, componentName, replicaName),
});

const mapDispatchToProps = dispatch => ({
  subscribe: (appName, envName, deploymentName, componentName, replicaName) => {
    dispatch(actionCreators.subscribeEnvironment(appName, envName));

    if (deploymentName) {
      // deploymentName is only available once environment has been loaded
      dispatch(
        actionCreators.subscribeReplicaLog(
          appName,
          deploymentName,
          componentName,
          replicaName
        )
      );
    }
  },
  unsubscribe: (
    appName,
    envName,
    deploymentName,
    componentName,
    replicaName
  ) => {
    dispatch(actionCreators.unsubscribeEnvironment(appName, envName));

    if (deploymentName) {
      // deploymentName is only available once environment has been loaded
      dispatch(
        actionCreators.unsubscribeReplicaLog(
          appName,
          deploymentName,
          componentName,
          replicaName
        )
      );
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReplicaOverview);
