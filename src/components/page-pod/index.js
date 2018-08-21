import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import DocumentTitle from '../document-title';
import Chip from '../chip';
import Code from '../code';
import Panel from '../panel';
import Toggler from '../toggler';

import { getPod } from '../../state/pods';
import { getLog, getStatus } from '../../state/pod-log';
import { podLogRequest } from '../../state/pod-log/action-creators';
import requestStates from '../../state/state-utils/request-states';

const makeHeader = text => (
  <h3 className="o-heading-section o-heading--lean">{text}</h3>
);

export class PageApplicationPod extends React.Component {
  componentWillMount() {
    this.props.requestLog();
  }

  componentDidUpdate(prevProps) {
    if (this.props.pod !== prevProps.pod) {
      this.props.requestLog();
    }
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
            {this.props.status === requestStates.IN_PROGRESS && <p>Loading…</p>}
            {this.props.status === requestStates.SUCCESS && (
              <Code>{this.props.log || '<empty log>'}</Code>
            )}
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

const mapStateToProps = (state, ownProps) => ({
  log: getLog(state),
  pod: getPod(state, ownProps.match.params.pod),
  status: getStatus(state),
});

const mapDispatchToProps = dispatch => ({
  requestPodLog: pod => dispatch(podLogRequest(pod)),
});

const mergeProps = (stateProps, dispatchProps) => ({
  log: stateProps.log,
  pod: stateProps.pod,
  status: stateProps.status,
  requestLog: () =>
    stateProps.pod && dispatchProps.requestPodLog(stateProps.pod),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(PageApplicationPod)
);
