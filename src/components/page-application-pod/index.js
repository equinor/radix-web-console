import React from 'react';
import { testSaga } from 'redux-saga-test-plan';

import { connect } from 'react-redux';

import Button from '../button';

import { getPod } from '../../state/pods';
import { getLog, getUpdatingLog } from '../../state/log';
import {
  requestFetchLog
} from '../../state/log/action-creators';

class PageApplicationPod extends React.Component {
  componentWillMount() {
    if(this.props.pod){
      this.props.fetchLog(this.props.pod);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="o-layout-page-head">
          <h1 className="o-heading-page">Pod</h1>
          <div>{this.props.pod && this.props.pod.metadata.name}</div>
        </div>
        <p>Hello, this is the pod page</p>
        {/* TODO: show pod logs */}
        {/* TODO: MAKE button inactive when there is no props.pod */}
        <Button
        btnType={['small', 'danger']}
        onClick={() =>
          this.props.pod &&
          this.props.fetchLog(this.props.pod)
        }
      >
        refresh</Button>
        <div>{this.props.updatingLog && 'Fetching log'}</div>
        <div>{this.props.log}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  pod: getPod(state, ownProps.match.params.pod),
  log: getLog(state),
  updatingLog: getUpdatingLog(state)
});
const mapDispatchToProps = (dispatch) => ({
  fetchLog: (pod) => dispatch(requestFetchLog(pod)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageApplicationPod);
