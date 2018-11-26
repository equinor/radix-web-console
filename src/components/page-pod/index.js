import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DocumentTitle from '../document-title';
import Chip from '../chip';
import Code from '../code';
import Panel from '../panel';
import Toggler from '../toggler';

import { mapRouteParamsToProps } from '../../utils/routing';
import { getPod } from '../../state/pods';
import { getReplicaLog } from '../../state/replica_log';
import {
  subscribeApplication,
  subscribeReplicaLog,
  unsubscribeApplication,
  unsubscribeReplicaLog,
} from '../../state/subscriptions/action-creators';

const makeHeader = text => (
  <h3 className="o-heading-section o-heading--lean">{text}</h3>
);

export class PageApplicationPod extends React.Component {
  componentWillMount() {
    const { appName, componentName, podName } = this.props;

    this.props.subscribeApplication(appName);
    this.props.subscribeReplicaLog(appName, componentName, podName);
  }

  componentDidUpdate(prevProps) {
    const { appName, componentName, podName } = this.props;

    if (appName !== prevProps.appName) {
      this.props.unsubscribeApplication(prevProps.appName);
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

    this.props.unsubscribeApplication(appName);
    this.props.unsubscribeReplicaLog(appName, componentName, podName);
  }

  render() {
    const pod = this.props.pod;

    if (!pod) {
      return 'Loading…';
    }

    const container = pod.spec.containers[0];

    return (
      <section>
        <DocumentTitle title={`${pod.metadata.name} (pod)`} />
        <h1 className="o-heading-page">Pod: {pod.metadata.name}</h1>
        <Panel>
          <div className="o-layout-columns">
            <div>
              <h3 className="o-heading-section o-heading--first">General</h3>
              <dl className="o-key-values">
                <div className="o-key-values__group">
                  <dt>Namespace</dt>
                  <dd>{pod.metadata.namespace}</dd>
                </div>
                <div className="o-key-values__group">
                  <dt>Created</dt>
                  <dd>{pod.metadata.creationTimestamp}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="o-heading-section o-heading--first">Container</h3>
              <dl className="o-key-values">
                <div className="o-key-values__group">
                  <dt>Ports</dt>
                  <dd>
                    <ul className="o-inline-list o-inline-list--spacing">
                      {container.ports.map(port => (
                        <li key={port.containerPort}>
                          <Chip>{port.containerPort.toString()}</Chip>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Panel>

        <Panel>
          <Toggler summary={makeHeader('Logs')}>
            <Code>{this.props.log || '<empty log>'}</Code>
          </Toggler>
        </Panel>

        <Panel>
          <Toggler summary={makeHeader('Resource')}>
            <Code>{JSON.stringify(pod, null, 2)}</Code>
          </Toggler>
        </Panel>
      </section>
    );
  }
}

PageApplicationPod.propTypes = {
  subscribeApplication: PropTypes.func.isRequired,
  subscribeReplicaLog: PropTypes.func.isRequired,
  log: PropTypes.string,
  pod: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  log: getReplicaLog(state),
  pod: getPod(state, ownProps.podName),
});

const mapDispatchToProps = dispatch => ({
  subscribeReplicaLog: (...args) => dispatch(subscribeReplicaLog(...args)),
  unsubscribeReplicaLog: (...args) => dispatch(unsubscribeReplicaLog(...args)),

  subscribeApplication: appName => dispatch(subscribeApplication(appName)),
  unsubscribeApplication: appName => dispatch(unsubscribeApplication(appName)),
});

export default mapRouteParamsToProps(
  ['appName', 'componentName', 'envName', 'podName'],
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageApplicationPod)
);
