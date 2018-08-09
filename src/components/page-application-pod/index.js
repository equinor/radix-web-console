import React from 'react';
// import { testSaga } from 'redux-saga-test-plan';

import { connect } from 'react-redux';

import Button from '../button';

import { getPod } from '../../state/pods';
import { getLog, getUpdatingLog } from '../../state/log';
import { requestFetchLog } from '../../state/log/action-creators';

class PageApplicationPod extends React.Component {
  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      if (this.props.pod) {
        this.props.fetchLog(this.props.pod);
      }
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return (
      <React.Fragment>
        <div className="o-layout-page-head">
          <h1 className="o-heading-page">Pod</h1>
          <div>{this.props.log === '' && 'No pod selected'}</div>
          <div>
            {this.props.pod &&
              this.props.log !== '' &&
              this.props.pod.metadata.name}
          </div>
        </div>
        {/* TODO: show pod logs */}
        {/* TODO: MAKE button inactive when there is no props.pod */}
        <Button
          btnType={['small', 'primary']}
          onClick={() => this.props.pod && this.props.fetchLog(this.props.pod)}
        >
          refresh
        </Button>
        <div>{this.props.log === '' && 'Select a pod to get logs'}</div>
        <div>{this.props.updatingLog && 'Fetching ...'}</div>
        <div>
          {/* TODO: remove index from key if sure no logs could be exactly the same OR use different key */}
          {!this.props.updatingLog &&
            this.props.log
              .split('\n')
              .map((line, index) => <p key={line + index}>{line}</p>)}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  pod: getPod(state, ownProps.match.params.pod),
  log: getLog(state),
  updatingLog: getUpdatingLog(state),
});
const mapDispatchToProps = dispatch => ({
  fetchLog: pod => dispatch(requestFetchLog(pod)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageApplicationPod);
