import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getPod } from '../../state/pods';
import { getLog, getStatus } from '../../state/pod-log';
import { podLogRequest } from '../../state/pod-log/action-creators';
import requestStates from '../../state/state-utils/request-states';

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
    return (
      <React.Fragment>
        <div className="o-layout-page-head">
          <h1 className="o-heading-page">Pod logs</h1>
        </div>
        {this.props.status === requestStates.IN_PROGRESS && <p>Loading…</p>}
        {this.props.status === requestStates.SUCCESS && (
          <pre>{this.props.log || '<empty log>'}</pre>
        )}
      </React.Fragment>
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
