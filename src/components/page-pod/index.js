import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DocumentTitle from '../document-title';
import Code from '../code';
import Panel from '../panel';
import Toggler from '../toggler';

import { mapRouteParamsToProps } from '../../utils/routing';
import { getReplicaLog } from '../../state/replica_log';
import {
  subscribeReplicaLog,
  unsubscribeReplicaLog,
} from '../../state/subscriptions/action-creators';

import { getReplicaStatus } from '../../state/environment';

const makeHeader = text => (
  <h3 className="o-heading-section o-heading--lean">{text}</h3>
);

export class PageApplicationPod extends React.Component {
  componentWillMount() {
    const { appName, componentName, podName } = this.props;

    this.props.subscribeReplicaLog(appName, componentName, podName);
  }

  componentDidUpdate(prevProps) {
    const { appName, componentName, podName } = this.props;

    if (appName !== prevProps.appName) {
      this.props.subscribeApplication(appName);
    }

    if (
      appName !== prevProps.appName ||
      componentName !== prevProps.componentName ||
      podName !== prevProps.podName
    ) {
      this.props.unsubscribeReplicaLog(
        prevProps.appName,
        prevProps.componentName,
        prevProps.podName
      );
      this.props.subscribeReplicaLog(appName, componentName, podName);
    }
  }

  componentWillUnmount() {
    const { appName, componentName, podName } = this.props;

    this.props.unsubscribeReplicaLog(appName, componentName, podName);
  }

  render() {
    const { podName, replicaStatus } = this.props;

    return (
      <section>
        <DocumentTitle title={`${podName} (replica)`} />

        <h1 className="o-heading-page">Replica: {podName}</h1>

        <Panel>
          <div>Status: {replicaStatus}</div>
        </Panel>

        <Panel>
          <Toggler summary={makeHeader('Logs')}>
            <Code>{this.props.log || '<empty log>'}</Code>
          </Toggler>
        </Panel>
      </section>
    );
  }
}

PageApplicationPod.propTypes = {
  appName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  log: PropTypes.string,
  podName: PropTypes.string.isRequired,
  replicaStatus: PropTypes.string.isRequired,
  subscribeReplicaLog: PropTypes.func.isRequired,
  unsubscribeReplicaLog: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  log: getReplicaLog(state),
  replicaStatus: getReplicaStatus(state, ownProps.componentName, ownProps.podName),
});

const mapDispatchToProps = dispatch => ({
  subscribeReplicaLog: (...args) => dispatch(subscribeReplicaLog(...args)),
  unsubscribeReplicaLog: (...args) => dispatch(unsubscribeReplicaLog(...args)),
});

export default mapRouteParamsToProps(
  ['appName', 'componentName', 'envName', 'podName'],
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageApplicationPod)
);
